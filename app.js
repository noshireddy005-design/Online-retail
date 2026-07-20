// Retail Customer Segmentation App Logic
// Uses global data object 'retailDashboardData' loaded from data.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize KPIs & UI Components
    initKPIs();
    initCharts();
    initInsightsGrid();
    initExplorerTable();
    initRFMSimulator();
    initDeveloperIDE();
});

// KPI Card Count Animations & Stat Setup
function initKPIs() {
    const summary = retailDashboardData.summary;
    
    // Animate large numbers slightly
    animateNumber("val-revenue", 0, summary.totalRevenue, "currency");
    animateNumber("val-transactions", 0, summary.totalTransactions, "integer");
    animateNumber("val-customers", 0, summary.activeCustomers, "integer");
}

function animateNumber(id, start, end, formatType) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    let current = start;
    const duration = 1200; // ms
    const stepTime = 30; // ms
    const steps = duration / stepTime;
    const increment = (end - start) / steps;
    let step = 0;
    
    const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
            clearInterval(timer);
            current = end;
        }
        
        if (formatType === "currency") {
            obj.innerHTML = "£" + (current / 1000000).toFixed(2) + "M";
        } else if (formatType === "integer") {
            obj.innerHTML = Math.round(current).toLocaleString();
        } else {
            obj.innerHTML = current;
        }
    }, stepTime);
}

// Chart.js Visualizations
let charts = {};
function initCharts() {
    // Destroy existing charts if any
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    
    // A. Revenue Growth Trend Chart (Line Chart)
    const trendCtx = document.getElementById("revenueTrendChart").getContext("2d");
    const trendData = retailDashboardData.monthlyRevenue;
    
    // Create horizontal gradient fill
    const trendGradient = trendCtx.createLinearGradient(0, 0, 0, 300);
    trendGradient.addColorStop(0, "rgba(99, 102, 241, 0.4)");
    trendGradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");
    
    charts.trend = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: trendData.map(d => d.month),
            datasets: [{
                label: 'Monthly Revenue (£)',
                data: trendData.map(d => d.revenue),
                borderColor: '#6366f1',
                borderWidth: 3,
                backgroundColor: trendGradient,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#818cf8',
                pointBorderColor: '#ffffff',
                pointHoverRadius: 7,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return 'Revenue: £' + context.raw.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        callback: function(value) {
                            return '£' + (value / 1000).toFixed(0) + 'k';
                        }
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // B. RFM Segments (Doughnut Chart)
    const segmentCtx = document.getElementById("segmentChart").getContext("2d");
    const segmentData = retailDashboardData.segments;
    
    charts.segments = new Chart(segmentCtx, {
        type: 'doughnut',
        data: {
            labels: segmentData.map(s => s.name),
            datasets: [{
                data: segmentData.map(s => s.count),
                backgroundColor: segmentData.map(s => s.color),
                borderWidth: 2,
                borderColor: '#111827',
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const val = context.raw;
                            const percentage = ((val / total) * 100).toFixed(1);
                            return ` ${context.label}: ${val} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });

    // C. Geographic Country Revenue Contribution (Horizontal Bar Chart)
    const countryCtx = document.getElementById("countryRevenueChart").getContext("2d");
    const countryData = retailDashboardData.countryRevenue.slice(0, 6); // Take top 6
    
    charts.country = new Chart(countryCtx, {
        type: 'bar',
        data: {
            labels: countryData.map(c => c.country),
            datasets: [{
                data: countryData.map(c => c.revenue),
                backgroundColor: 'rgba(6, 182, 212, 0.85)',
                hoverBackgroundColor: '#06b6d4',
                borderColor: '#06b6d4',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Revenue: £' + context.raw.toLocaleString(undefined, {maximumFractionDigits: 0});
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        callback: function(value) {
                            return '£' + (value / 1000000).toFixed(1) + 'M';
                        }
                    }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Insights Section Grid populator
function initInsightsGrid() {
    const container = document.getElementById("insights-grid-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    retailDashboardData.segments.forEach(segment => {
        let slug = segment.name.toLowerCase().replace(" ", "-");
        // Simplify name for css classes
        let cardClass = "lost";
        if (segment.name.includes("Champions")) cardClass = "champions";
        else if (segment.name.includes("Loyal")) cardClass = "loyal";
        else if (segment.name.includes("Potential")) cardClass = "potential";
        else if (segment.name.includes("At Risk")) cardClass = "atrisk";
        
        const cardHtml = `
            <div class="insight-card ${cardClass}">
                <h4>${segment.name} <span class="insight-share">${segment.percentage}% share</span></h4>
                <p class="insight-desc">${segment.description}</p>
                <div class="insight-action-box">
                    <strong>Recommended Strategy</strong>
                    <p>${segment.strategy}</p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", cardHtml);
    });
}

// Customer Explorer Table (Searching, Filtering, Sorting, Pagination)
let tableState = {
    search: "",
    segmentFilter: "ALL",
    sortBy: "id",
    sortOrder: "asc", // 'asc' or 'desc'
    page: 1,
    pageSize: 10
};

function initExplorerTable() {
    const searchInput = document.getElementById("search-cust-id");
    const segmentFilter = document.getElementById("filter-segment");
    const prevBtn = document.getElementById("btn-prev-page");
    const nextBtn = document.getElementById("btn-next-page");
    
    // Bind search
    searchInput.addEventListener("input", (e) => {
        tableState.search = e.target.value.trim();
        tableState.page = 1;
        renderExplorerTable();
    });
    
    // Bind filter
    segmentFilter.addEventListener("change", (e) => {
        tableState.segmentFilter = e.target.value;
        tableState.page = 1;
        renderExplorerTable();
    });
    
    // Bind sorting headers
    document.querySelectorAll("#customer-table th.sortable").forEach(th => {
        th.addEventListener("click", () => {
            const field = th.getAttribute("data-sort");
            if (tableState.sortBy === field) {
                tableState.sortOrder = tableState.sortOrder === "asc" ? "desc" : "asc";
            } else {
                tableState.sortBy = field;
                tableState.sortOrder = "asc";
            }
            renderExplorerTable();
        });
    });
    
    // Bind pagination
    prevBtn.addEventListener("click", () => {
        if (tableState.page > 1) {
            tableState.page--;
            renderExplorerTable();
        }
    });
    
    nextBtn.addEventListener("click", () => {
        const totalFiltered = getFilteredCustomers().length;
        const maxPages = Math.ceil(totalFiltered / tableState.pageSize);
        if (tableState.page < maxPages) {
            tableState.page++;
            renderExplorerTable();
        }
    });
    
    // Initial Render
    renderExplorerTable();
}

function getFilteredCustomers() {
    let list = [...retailDashboardData.customers];
    
    // Apply Search
    if (tableState.search !== "") {
        list = list.filter(c => c.id.toString().includes(tableState.search));
    }
    
    // Apply Segment Filter
    if (tableState.segmentFilter !== "ALL") {
        list = list.filter(c => c.segment === tableState.segmentFilter);
    }
    
    // Apply Sorting
    list.sort((a, b) => {
        let fieldA = a[tableState.sortBy];
        let fieldB = b[tableState.sortBy];
        
        // Handle string comparison for segment and country
        if (typeof fieldA === "string") {
            return tableState.sortOrder === "asc" 
                ? fieldA.localeCompare(fieldB) 
                : fieldB.localeCompare(fieldA);
        }
        
        // Numeric sort
        return tableState.sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
    });
    
    return list;
}

function renderExplorerTable() {
    const tableBody = document.getElementById("customer-table-body");
    const prevBtn = document.getElementById("btn-prev-page");
    const nextBtn = document.getElementById("btn-next-page");
    const pagStartSpan = document.getElementById("pag-start");
    const pagEndSpan = document.getElementById("pag-end");
    const pagTotalSpan = document.getElementById("pag-total");
    
    const filtered = getFilteredCustomers();
    const totalCount = filtered.length;
    
    // Calculate pages
    const maxPages = Math.ceil(totalCount / tableState.pageSize) || 1;
    if (tableState.page > maxPages) {
        tableState.page = maxPages;
    }
    
    const startIdx = (tableState.page - 1) * tableState.pageSize;
    const endIdx = Math.min(startIdx + tableState.pageSize, totalCount);
    
    const displayed = filtered.slice(startIdx, endIdx);
    
    // Clear and build body
    tableBody.innerHTML = "";
    
    if (displayed.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No matching customers found.</td></tr>`;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        pagStartSpan.innerText = "0";
        pagEndSpan.innerText = "0";
        pagTotalSpan.innerText = "0";
        return;
    }
    
    displayed.forEach(c => {
        let badgeClass = c.segment.toLowerCase().replace(" ", "-");
        const trHtml = `
            <tr>
                <td style="font-weight: 600;">#${c.id}</td>
                <td>${c.country}</td>
                <td>${c.recency}</td>
                <td>${c.frequency}</td>
                <td style="font-family: 'Space Grotesk', sans-serif; font-weight: 500;">£${c.monetary.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td><span class="segment-badge ${badgeClass}">${c.segment}</span></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", trHtml);
    });
    
    // Update sort headers indicators
    document.querySelectorAll("#customer-table th.sortable").forEach(th => {
        const field = th.getAttribute("data-sort");
        const indicator = th.querySelector(".sort-indicator");
        if (tableState.sortBy === field) {
            indicator.innerText = tableState.sortOrder === "asc" ? "▲" : "▼";
            indicator.style.color = "var(--accent-secondary)";
        } else {
            indicator.innerText = "↕";
            indicator.style.color = "var(--text-muted)";
        }
    });
    
    // Update pagination variables
    pagStartSpan.innerText = (startIdx + 1).toLocaleString();
    pagEndSpan.innerText = endIdx.toLocaleString();
    pagTotalSpan.innerText = totalCount.toLocaleString();
    
    // Enable/disable page buttons
    prevBtn.disabled = tableState.page === 1;
    nextBtn.disabled = tableState.page === maxPages;
}

// RFM Score Simulator Engine
function initRFMSimulator() {
    const form = document.getElementById("rfm-calc-form");
    const resultBox = document.getElementById("calc-result");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const recency = parseInt(document.getElementById("calc-recency").value);
        const frequency = parseInt(document.getElementById("calc-frequency").value);
        const monetary = parseFloat(document.getElementById("calc-monetary").value);
        
        // 1. Calculate Score R (1-5 scale)
        let rScore = 1;
        if (recency <= 15) rScore = 5;
        else if (recency <= 45) rScore = 4;
        else if (recency <= 90) rScore = 3;
        else if (recency <= 180) rScore = 2;
        
        // 2. Calculate Score F (1-5 scale)
        let fScore = 1;
        if (frequency >= 15) fScore = 5;
        else if (frequency >= 8) fScore = 4;
        else if (frequency >= 4) fScore = 3;
        else if (frequency >= 2) fScore = 2;
        
        // 3. Calculate Score M (1-5 scale)
        let mScore = 1;
        if (monetary >= 5000) mScore = 5;
        else if (monetary >= 1500) mScore = 4;
        else if (monetary >= 500) mScore = 3;
        else if (monetary >= 150) mScore = 2;
        
        // Determine Segment matching the Python segment definition
        let segment = "Lost Customers";
        let color = "lost-customers";
        
        if (rScore >= 4 && fScore >= 4 && mScore >= 4) {
            segment = "Champions";
            color = "champions";
        } else if (rScore >= 3 && fScore >= 3 && mScore >= 3) {
            segment = "Loyal Customers";
            color = "loyal-customers";
        } else if (rScore >= 4 && fScore >= 1 && mScore >= 2) {
            segment = "Potential Loyalists";
            color = "potential-loyalists";
        } else if (rScore <= 2 && (fScore >= 3 || mScore >= 3)) {
            segment = "At Risk";
            color = "at-risk";
        }
        
        // Get segment details
        const segmentDetails = retailDashboardData.segments.find(s => s.name === segment);
        
        // Update Simulator UI results
        document.getElementById("calc-result-segment").innerText = segment;
        document.getElementById("calc-result-segment").className = `segment-badge ${color}`;
        document.getElementById("calc-result-r").innerText = rScore;
        document.getElementById("calc-result-f").innerText = fScore;
        document.getElementById("calc-result-m").innerText = mScore;
        document.getElementById("calc-result-strategy").innerText = segmentDetails.strategy;
        
        // Trigger reveal
        resultBox.classList.remove("hidden");
        
        // Trigger micro scroll to result on mobile
        if (window.innerWidth < 768) {
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// Technical Workspace Code Viewer Tabs & Highlighting
function initDeveloperIDE() {
    const fileItems = document.querySelectorAll(".file-item");
    
    // Bind tab clicks
    fileItems.forEach(item => {
        item.addEventListener("click", () => {
            fileItems.forEach(f => f.classList.remove("active"));
            item.classList.add("active");
            
            const fileKey = item.getAttribute("data-file");
            loadCodeFile(fileKey, item.querySelector(".file-name").innerText);
        });
    });
    
    // Load initial file
    loadCodeFile("pythonCleaning", "data_cleaning.py");
}

function loadCodeFile(fileKey, filename) {
    const display = document.getElementById("code-content-block");
    const nameLabel = document.getElementById("current-filename");
    
    nameLabel.innerText = filename;
    const rawCode = retailDashboardData.codeShowcase[fileKey];
    
    // Apply custom syntax highlighting
    const highlighted = highlightSyntax(rawCode, filename.endsWith(".sql") ? "sql" : filename.endsWith(".py") ? "python" : "markdown");
    display.innerHTML = highlighted;
}

// Regex-based Syntax Highlighter to create premium visual styling inside our custom code viewer
function highlightSyntax(code, lang) {
    // Escape HTML first
    let escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
        
    if (lang === "markdown") {
        // Highlight markdown headers, inline code, bold text
        escaped = escaped
            .replace(/^(###\s+.*)$/gm, '<span class="code-keyword" style="color:#a5b4fc;">$1</span>')
            .replace(/^(##\s+.*)$/gm, '<span class="code-keyword" style="color:#818cf8; font-size:1rem;">$1</span>')
            .replace(/`([^`]+)`/g, '<span class="code-string" style="background:rgba(255,255,255,0.05); padding: 2px 4px; border-radius:4px;">$1</span>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#ffffff;">$1</strong>');
        return escaped;
    }
    
    if (lang === "python") {
        // Python Highlight rules
        const keywords = /\b(import|as|from|def|return|if|elif|else|print|for|in|and|not|lambda|inplace|astype)\b/g;
        const builtins = /\b(pd|np|DataFrame|groupby|agg|max|rename|Timedelta|qcut|apply|len|int|str|float)\b/g;
        
        escaped = escaped
            // Highlight single line comments
            .replace(/(#.*)$/gm, '<span class="code-comment">$1</span>')
            // Highlight strings (single and double quoted)
            .replace(/(".*?"|'.*?')/g, '<span class="code-string">$1</span>')
            // Highlight numbers
            .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
            // Highlight keywords
            .replace(keywords, '<span class="code-keyword">$1</span>')
            // Highlight builtins/libraries
            .replace(builtins, '<span class="code-builtin">$1</span>');
            
        return escaped;
    }
    
    if (lang === "sql") {
        // SQL Highlight rules
        const keywords = /\b(WITH|AS|SELECT|MAX|COUNT|DISTINCT|SUM|FROM|WHERE|GROUP BY|ORDER BY|AND|OR|NOT|LIKE|OVER|NTILE|DESC|NULL|IS|IS NOT|day)\b/g;
        
        escaped = escaped
            // Highlight SQL comments
            .replace(/(--.*)$/gm, '<span class="code-comment">$1</span>')
            // Highlight strings
            .replace(/('.*?')/g, '<span class="code-string">$1</span>')
            // Highlight numbers
            .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
            // Highlight keywords
            .replace(keywords, '<span class="code-keyword">$1</span>');
            
        return escaped;
    }
    
    return escaped;
}
