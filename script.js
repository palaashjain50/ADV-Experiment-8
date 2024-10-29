const margin = { top: 40, right: 60, bottom: 60, left: 60 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function createTemperatureChart() {
    const svg = d3.select("#temperature-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = Array.from({length: 15}, (_, i) => ({
        week: `Week ${i+1}`,
        maxTemp: Math.sin(i/3) * 5 + 25,
        minTemp: Math.sin(i/3) * 5 + 20
    }));

    const x = d3.scalePoint()
        .domain(data.map(d => d.week))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 35])
        .range([height, 0]);

    const maxLine = d3.line()
        .x(d => x(d.week))
        .y(d => y(d.maxTemp));

    const minLine = d3.line()
        .x(d => x(d.week))
        .y(d => y(d.minTemp));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .style("stroke", "steelblue")
        .attr("d", maxLine);

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .style("stroke", "orange")
        .attr("d", minLine);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 100}, 0)`);

    legend.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .text("Avg. Max Temp")
        .style("fill", "steelblue");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 30)
        .text("Avg. Min Temp")
        .style("fill", "orange");
}

function createMonthlyChart() {
    const svg = d3.select("#monthly-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = months.map(month => ({
        month: month,
        value1: Math.random() * 30 + 10,
        value2: Math.random() * 10
    }));

    const x = d3.scaleBand()
        .domain(months)
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, 45])
        .range([height, 0]);

    svg.selectAll(".bar1")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.month))
        .attr("y", d => y(d.value1))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value1))
        .attr("fill", "#98FB98");

    svg.selectAll(".bar2")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.month))
        .attr("y", d => y(d.value2))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value2))
        .attr("fill", "#228B22");

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));
}

function createScatterPlot() {
    const svg = d3.select("#scatter-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = Array.from({length: 100}, (_, i) => ({
        humidity: i,
        pressure: Math.random() * 4 + 4,
        rain: Math.random() > 0.5
    }));

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "scatter-dot")
        .attr("cx", d => x(d.humidity))
        .attr("cy", d => y(d.pressure))
        .attr("r", 4)
        .style("fill", d => d.rain ? "red" : "green");

    const line = d3.line()
        .x(d => x(d.humidity))
        .y(d => y(4 + d.humidity * 0.04));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .style("stroke", "black")
        .style("stroke-width", 1)
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", height + 40)
        .text("Humidity9am");

    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("y", -40)
        .text("Std.dev of Pressure9..");
}

function createHeatmap() {
    const svg = d3.select("#heatmap")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const years = ["2007", "2008", "2009", "2010", "2012", "2014", "2015", "2016", "2017"];
    const data = years.map(year => ({
        year: year,
        value: Math.random() * 11.67
    }));

    const color = d3.scaleLinear()
        .domain([0.06, 11.67])
        .range(["#FFB6C1", "#8B0000"]);

    const squareSize = Math.min(width, height) / 4;
    
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => (i % 3) * squareSize)
        .attr("y", (d, i) => Math.floor(i / 3) * squareSize)
        .attr("width", squareSize)
        .attr("height", squareSize)
        .style("fill", d => color(d.value))
        .style("stroke", "white");

    svg.selectAll(".year-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "year-label")
        .attr("x", (d, i) => (i % 3) * squareSize + squareSize/2)
        .attr("y", (d, i) => Math.floor(i / 3) * squareSize + squareSize/2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("fill", "white")
        .text(d => d.year);
}

function createPieChart() {
    const svg = d3.select("#pie-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width/2 + margin.left},${height/2 + margin.top})`);

    const data = [
        { label: "No, No", value: 45 },
        { label: "No, Yes", value: 30 },
        { label: "Yes, No", value: 15 },
        { label: "Yes, Yes", value: 10 }
    ];

    const pie = d3.pie()
        .value(d => d.value);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2);

    const colors = ["#FF6B6B", "#FFB6C1", "#4ECDC4", "#45B7AF"];

    const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colors[i]);

    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data.label)
        .style("font-size", "12px")
        .style("fill", "white");
}

document.addEventListener("DOMContentLoaded", function() {
    createTemperatureChart();
    createMonthlyChart();
    createScatterPlot();
    createHeatmap();
    createPieChart();
});