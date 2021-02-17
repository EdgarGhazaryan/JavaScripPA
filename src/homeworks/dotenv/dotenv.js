const fs = require("fs");

function parse(arr) {
    let key = arr[0];
    let value = arr[1];

    if (value === "true") {
        return [key, true];
    }
    if (value === "false") {
        return [key, false];
    }

    if (Number(value)) {
        return [key, Number(value)];
    }

    if (value.startsWith('"') && value.endsWith('"') || value.startsWith('\'') && value.endsWith('\'')) {
        value = value.slice(1, -1);
    }
    return [key, value];
}

module.exports = {
    config: () => {
        const data = fs.readFileSync(".env", "utf-8");
        const lines = data.split("\n");
        lines.forEach(line => {
            if (!line.startsWith("#") && line.includes("=")) {
                let current = line.split("=", 1);
                current[1] = line.substring(current[0].length + 1, line.length);
                if (current.length === 2) {
                    current = [current[0].trim(), current[1].trim()];
                    const [key, value] = parse(current);
                    process.env[key] = value;
                }
            }
        })
    }
}