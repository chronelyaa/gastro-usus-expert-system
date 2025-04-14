const penyakit = [
    "Staphylococcus aureus",
    "Jamur beracun",
    "Salmonellae",
    "Clostridium botulinum",
    "Campylobacter"
];

const bagansakit = [
    [0,1,2,3,9],
    [0,1,2,4,10],
    [0,1,2,5,6,9],
    [1,7,11],
    [8,2,5,12]
];

const bagangejala = [
    [1,2,4,5],
    [4,5,6],
    [4,7],
    [4,8,9],
    [8,10],
    [4,5,9,11],
    [4,8,11,12],
    [4,13],
    [1,2,3,4],
    [14,15],
    [14,16],
    [14,17],
    [18,19]
];

document.getElementById('proses').addEventListener('click', calculate);

document.getElementById('reset').addEventListener('click', () => {
    document.querySelectorAll('.symptom').forEach(cb => cb.checked = false);
    document.getElementById('threshold').value = 0;
    document.getElementById('details').textContent = '';
    document.getElementById('result').textContent = 'none';
});

function calculate() {
    const checkboxes = document.querySelectorAll('.symptom');
    const checked = Array.from(checkboxes).map(cb => cb.checked);
    
    const sakit = bagangejala.map(group => {
        const groupLength = group.length;
        const count = group.filter(s => checked[s-1]).length;
        return (count / groupLength) * 100;
    });
    

    const target = bagansakit.map(disease => {
        const sum = disease.reduce((acc, idx) => acc + sakit[idx], 0);
        return sum / disease.length;
    });
    
    let maxPercent = 0;
    let maxIndex = 0;
    let details = "";
    
    if(!checked.includes(true)) {
        alert("Silakan pilih gejala yang sesuai.");
        return;
    }

    target.forEach((percent, index) => {
        details += `${penyakit[index]}: ${percent.toFixed(2)}%\n`;
        if(percent > maxPercent) {
            maxPercent = percent;
            maxIndex = index;
        }
    });
    
    const threshold = parseFloat(document.getElementById('threshold').value) || 0;
    
    if(isNaN(threshold) || threshold < 0 || threshold > 100) {
        alert("Threshold harus ada diantara 0 dan 100.");
        return;
    }

    document.getElementById('details').textContent = details;
    document.getElementById('result').textContent = 
        maxPercent >= threshold ? penyakit[maxIndex] : "none";
}