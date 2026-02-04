// Factsheet Generator JavaScript

let uploadedFiles = [];
let weightsEnabled = false;

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const strategyList = document.getElementById('strategyList');
const weightToggle = document.getElementById('weightToggle');
const generateBtn = document.getElementById('generateBtn');
const statusMessage = document.getElementById('statusMessage');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    // File upload
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    
    // Weight toggle
    weightToggle.addEventListener('click', toggleWeights);
    
    // Generate button
    generateBtn.addEventListener('click', generateFactsheet);
}

function handleFileSelect(e) {
    handleFiles(e.target.files);
}

function handleFiles(files) {
    for (let file of files) {
        if (file.name.endsWith('.csv')) {
            const fileObj = {
                file: file,
                name: file.name,
                weight: 100,
                id: Date.now() + Math.random()
            };
            uploadedFiles.push(fileObj);
        }
    }
    
    renderStrategyList();
    updateGenerateButton();
}

function renderStrategyList() {
    if (uploadedFiles.length === 0) {
        strategyList.innerHTML = '';
        return;
    }
    
    // Normalize weights if enabled
    if (weightsEnabled && uploadedFiles.length > 1) {
        const totalWeight = uploadedFiles.reduce((sum, f) => sum + parseFloat(f.weight || 0), 0);
        uploadedFiles.forEach(f => {
            f.normalizedWeight = (f.weight / totalWeight) * 100;
        });
    }
    
    strategyList.innerHTML = uploadedFiles.map((fileObj, index) => `
        <div class="strategy-item">
            <div class="strategy-name">
                <strong>${fileObj.name}</strong>
                ${weightsEnabled && uploadedFiles.length > 1 ? 
                    `<br><span style="color: var(--text-secondary); font-size: 12px;">
                        Normalized: ${fileObj.normalizedWeight?.toFixed(1)}%
                    </span>` : ''}
            </div>
            <div class="strategy-weight">
                ${weightsEnabled && uploadedFiles.length > 1 ? `
                    <input 
                        type="number" 
                        value="${fileObj.weight}" 
                        min="0" 
                        step="1"
                        onchange="updateWeight(${index}, this.value)"
                        placeholder="Weight"
                    >
                    <label>Weight</label>
                ` : '<span style="color: var(--text-secondary);">100%</span>'}
            </div>
            <button class="remove-btn" onclick="removeFile(${index})">Remove</button>
        </div>
    `).join('');
}

function updateWeight(index, value) {
    uploadedFiles[index].weight = parseFloat(value) || 0;
    renderStrategyList();
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
    renderStrategyList();
    updateGenerateButton();
}

function toggleWeights() {
    weightsEnabled = !weightsEnabled;
    weightToggle.classList.toggle('active');
    
    // Reset weights when toggling off
    if (!weightsEnabled) {
        uploadedFiles.forEach(f => f.weight = 100);
    }
    
    renderStrategyList();
}

function updateGenerateButton() {
    generateBtn.disabled = uploadedFiles.length === 0;
}

async function generateFactsheet() {
    if (uploadedFiles.length === 0) return;
    
    showStatus('processing', 'Processing trade data and generating factsheet...');
    generateBtn.disabled = true;
    
    try {
        // Read and parse CSV files
        const strategies = await Promise.all(
            uploadedFiles.map(async (fileObj) => {
                const text = await fileObj.file.text();
                const data = parseCSV(text);
                return {
                    name: fileObj.name.replace('.csv', ''),
                    data: data,
                    weight: weightsEnabled && uploadedFiles.length > 1 ? 
                        fileObj.normalizedWeight : 100
                };
            })
        );
        
        // Get settings
        const settings = {
            title: document.getElementById('reportTitle').value,
            subtitle: document.getElementById('reportSubtitle').value,
            riskFreeRate: parseFloat(document.getElementById('riskFreeRate').value) || 0
        };
        
        // Generate factsheet
        const factsheet = await createFactsheet(strategies, settings);
        
        // Download
        downloadFactsheet(factsheet);
        
        showStatus('success', 'Factsheet generated successfully! Download should start automatically.');
        
    } catch (error) {
        console.error('Error generating factsheet:', error);
        showStatus('error', `Error: ${error.message}`);
    } finally {
        generateBtn.disabled = false;
    }
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index]?.trim();
        });
        data.push(row);
    }
    
    return data;
}

async function createFactsheet(strategies, settings) {
    // This is a simplified version - the full implementation would need
    // to replicate the Python logic for calculating metrics
    
    // Process each strategy
    const processedStrategies = strategies.map(strategy => {
        return processStrategy(strategy.data, strategy.name, strategy.weight);
    });
    
    // Combine if multiple strategies
    let combinedEquity;
    if (processedStrategies.length > 1 && weightsEnabled) {
        combinedEquity = combineStrategies(processedStrategies);
    } else {
        combinedEquity = processedStrategies[0];
    }
    
    // Calculate metrics
    const metrics = calculateMetrics(combinedEquity, settings.riskFreeRate);
    
    // Generate PDF
    const pdf = generatePDF(metrics, settings, strategies);
    
    return pdf;
}

function processStrategy(trades, name, weight) {
    // Filter for exits
    const exits = trades.filter(trade => 
        trade.Type && trade.Type.includes('Exit')
    );
    
    // Extract returns
    const returns = [];
    const dates = [];
    
    exits.forEach(trade => {
        const dateCol = trade['Date/Time'] || trade['Date'];
        const pnlCol = Object.keys(trade).find(k => k.includes('Net P&L %'));
        
        if (dateCol && pnlCol) {
            const date = new Date(dateCol);
            const returnPct = parseFloat(trade[pnlCol]) / 100;
            
            if (!isNaN(date.getTime()) && !isNaN(returnPct)) {
                dates.push(date);
                returns.push(returnPct * (weight / 100));
            }
        }
    });
    
    // Build equity curve
    let equity = 1000; // Start with $1000
    const equityCurve = [{ date: dates[0], value: equity }];
    
    returns.forEach((ret, i) => {
        equity = equity * (1 + ret);
        equityCurve.push({ date: dates[i], value: equity });
    });
    
    return {
        name,
        returns,
        dates,
        equityCurve,
        weight
    };
}

function combineStrategies(strategies) {
    // Combine multiple strategies based on weights
    // This is a simplified version - full implementation would handle
    // different date ranges and dynamic rebalancing
    
    const allDates = new Set();
    strategies.forEach(s => s.dates.forEach(d => allDates.add(d.getTime())));
    const sortedDates = Array.from(allDates).sort().map(t => new Date(t));
    
    let equity = 1000;
    const equityCurve = [{ date: sortedDates[0], value: equity }];
    
    sortedDates.slice(1).forEach(date => {
        let dailyReturn = 0;
        
        strategies.forEach(strategy => {
            const dateIdx = strategy.dates.findIndex(d => 
                d.getTime() === date.getTime()
            );
            
            if (dateIdx !== -1) {
                dailyReturn += strategy.returns[dateIdx];
            }
        });
        
        equity = equity * (1 + dailyReturn);
        equityCurve.push({ date, value: equity });
    });
    
    return {
        name: 'Combined Portfolio',
        equityCurve,
        weight: 100
    };
}

function calculateMetrics(strategy, riskFreeRate) {
    const equity = strategy.equityCurve;
    const returns = [];
    
    for (let i = 1; i < equity.length; i++) {
        returns.push((equity[i].value - equity[i-1].value) / equity[i-1].value);
    }
    
    // Calculate basic metrics
    const totalReturn = ((equity[equity.length - 1].value - equity[0].value) / equity[0].value) * 100;
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const volatility = Math.sqrt(
        returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
    ) * Math.sqrt(252) * 100; // Annualized
    
    const annualizedReturn = avgReturn * 252 * 100; // Assuming daily returns
    const sharpe = (annualizedReturn - riskFreeRate) / volatility;
    
    // Calculate max drawdown
    let maxDrawdown = 0;
    let peak = equity[0].value;
    
    equity.forEach(point => {
        if (point.value > peak) peak = point.value;
        const drawdown = (peak - point.value) / peak;
        if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    });
    
    return {
        totalReturn: totalReturn.toFixed(2),
        annualizedReturn: annualizedReturn.toFixed(2),
        volatility: volatility.toFixed(2),
        sharpe: sharpe.toFixed(2),
        maxDrawdown: (maxDrawdown * 100).toFixed(2),
        finalValue: equity[equity.length - 1].value.toFixed(2),
        startDate: equity[0].date.toLocaleDateString(),
        endDate: equity[equity.length - 1].date.toLocaleDateString()
    };
}

function generatePDF(metrics, settings, strategies) {
    // Generate a simple HTML report that can be printed to PDF
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${settings.title}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    max-width: 800px; 
                    margin: 40px auto; 
                    padding: 20px;
                }
                h1 { color: #00ff88; font-size: 32px; margin-bottom: 10px; }
                h2 { color: #00d4ff; font-size: 18px; margin-top: 30px; }
                .subtitle { color: #888; font-size: 16px; margin-bottom: 40px; }
                .metric-grid { 
                    display: grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap: 20px; 
                    margin: 20px 0;
                }
                .metric { 
                    background: #f5f5f5; 
                    padding: 15px; 
                    border-radius: 8px;
                }
                .metric-label { 
                    font-size: 12px; 
                    color: #666; 
                    text-transform: uppercase; 
                    letter-spacing: 1px;
                }
                .metric-value { 
                    font-size: 24px; 
                    font-weight: bold; 
                    color: #333; 
                    margin-top: 5px;
                }
                .strategy-list { margin: 20px 0; }
                .strategy-item { 
                    padding: 10px; 
                    background: #f9f9f9; 
                    margin: 5px 0; 
                    border-radius: 4px;
                }
                .disclaimer { 
                    margin-top: 40px; 
                    padding: 20px; 
                    background: #fff3cd; 
                    border: 1px solid #ffc107; 
                    border-radius: 8px;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <h1>${settings.title}</h1>
            <div class="subtitle">${settings.subtitle}</div>
            
            <h2>Performance Metrics</h2>
            <div class="metric-grid">
                <div class="metric">
                    <div class="metric-label">Total Return</div>
                    <div class="metric-value">${metrics.totalReturn}%</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Annualized Return</div>
                    <div class="metric-value">${metrics.annualizedReturn}%</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Volatility (Ann.)</div>
                    <div class="metric-value">${metrics.volatility}%</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Sharpe Ratio</div>
                    <div class="metric-value">${metrics.sharpe}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Max Drawdown</div>
                    <div class="metric-value">-${metrics.maxDrawdown}%</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Final Portfolio Value</div>
                    <div class="metric-value">$${metrics.finalValue}</div>
                </div>
            </div>
            
            <h2>Portfolio Composition</h2>
            <div class="strategy-list">
                ${strategies.map(s => `
                    <div class="strategy-item">
                        <strong>${s.name}</strong> - ${s.weight.toFixed(1)}% allocation
                    </div>
                `).join('')}
            </div>
            
            <div class="disclaimer">
                <strong>DISCLAIMER:</strong> This composite performance record and statistics are hypothetical. 
                Past performance does not guarantee future results. This is for educational purposes only and 
                not financial advice. Please consult with a financial advisor before making investment decisions.
            </div>
            
            <div style="margin-top: 40px; text-align: center; color: #888; font-size: 12px;">
                Generated by Poet Factsheet Generator | ${new Date().toLocaleDateString()}
            </div>
        </body>
        </html>
    `;
    
    return html;
}

function downloadFactsheet(htmlContent) {
    // Create a new window and print to PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print dialog
    setTimeout(() => {
        printWindow.print();
    }, 500);
}

function showStatus(type, message) {
    statusMessage.className = `status-message ${type}`;
    
    if (type === 'processing') {
        statusMessage.innerHTML = `<span class="spinner"></span>${message}`;
    } else {
        statusMessage.textContent = message;
    }
}
