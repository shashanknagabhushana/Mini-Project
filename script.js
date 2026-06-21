let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

displayCandidates();

function addCandidate() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const skills = document.getElementById("skills").value;
    const experience = document.getElementById("experience").value;

    if (!name || !email || !skills || !experience) {
        alert("Please fill all fields");
        return;
    }

    const candidate = {
        name,
        email,
        skills,
        experience,
        match: 0,
        status: "Applied"
    };

    candidates.push(candidate);

    saveData();
    displayCandidates();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("experience").value = "";
}

function screenCandidates() {
    const requiredSkills = document
        .getElementById("requiredSkills")
        .value
        .toLowerCase()
        .split(",");

    candidates.forEach(candidate => {
        const candidateSkills = candidate.skills
            .toLowerCase()
            .split(",");

        let matched = 0;

        requiredSkills.forEach(skill => {
            if (candidateSkills.includes(skill.trim())) {
                matched++;
            }
        });

        candidate.match = Math.round(
            (matched / requiredSkills.length) * 100
        );

        candidate.status =
            candidate.match >= 70 ? "Shortlisted" : "Rejected";
    });

    saveData();
    displayCandidates();
}

function displayCandidates() {
    const table = document.getElementById("candidateTable");

    table.innerHTML = "";

    candidates.forEach((candidate, index) => {
        table.innerHTML += `
            <tr>
                <td>${candidate.name}</td>
                <td>${candidate.email}</td>
                <td>${candidate.skills}</td>
                <td>${candidate.experience}</td>
                <td>${candidate.match}%</td>
                <td><span class="${
        candidate.status === 'Shortlisted'
        ? 'badge-green'
        : candidate.status === 'Rejected'
        ? 'badge-red'
        : 'badge-yellow'
    }">
        ${candidate.status}
    </span>
</td>
                <td>
                    .badge-green{
    background:#dcfce7;
    color:#15803d;
    padding:6px 12px;
    border-radius:20px;
    font-weight:bold;
}

.badge-red{
    background:#fee2e2;
    color:#b91c1c;
    padding:6px 12px;
    border-radius:20px;
    font-weight:bold;
}

.badge-yellow{
    background:#fef9c3;
    color:#a16207;
    padding:6px 12px;
    border-radius:20px;
    font-weight:bold;
}
                </td>
            </tr>
        `;
    });

    updateDashboard();
}
function saveData() {
    localStorage.setItem(
        "candidates",
        JSON.stringify(candidates)
    );
}

function updateDashboard() {
    document.getElementById("totalApps").innerText =
        candidates.length;

    document.getElementById("shortlisted").innerText =
        candidates.filter(
            c => c.status === "Shortlisted"
        ).length;

    document.getElementById("rejected").innerText =
        candidates.filter(
            c => c.status === "Rejected"
        ).length;
    const shortlisted =
candidates.filter(
c => c.status === "Shortlisted"
).length;

const rate =
candidates.length === 0
? 0
: Math.round(
(shortlisted / candidates.length) * 100
);

document.getElementById(
"successRate"
).innerText = rate + "%";
}
function clearAllData() {
    if (confirm("Are you sure you want to delete all candidates?")) {
        candidates = [];
        saveData();
        displayCandidates();
    }
}
function deleteCandidate(index) {
    if (confirm("Delete this candidate?")) {
        candidates.splice(index, 1);
        saveData();
        displayCandidates();
    }
}

function editCandidate(index) {
    const candidate = candidates[index];

    document.getElementById("name").value = candidate.name;
    document.getElementById("email").value = candidate.email;
    document.getElementById("skills").value = candidate.skills;
    document.getElementById("experience").value = candidate.experience;

    candidates.splice(index, 1);

    saveData();
function generateAIReport() {

```
if(candidates.length === 0){
    alert("No candidates available");
    return;
}

let shortlisted =
    candidates.filter(c => c.status === "Shortlisted").length;

let percentage =
    Math.round((shortlisted / candidates.length) * 100);

let recommendation = "";

if(percentage >= 70){
    recommendation =
    "Strong candidate pool. Recommended for interviews.";
}
else if(percentage >= 40){
    recommendation =
    "Moderate candidate quality. Additional screening advised.";
}
else{
    recommendation =
    "Low matching rate. Consider expanding recruitment efforts.";
}

document.getElementById("aiResult").innerHTML = `
    <h3>AI Recruitment Insight</h3>

    <p><strong>Total Candidates:</strong>
    ${candidates.length}</p>

    <p><strong>Shortlisted:</strong>
    ${shortlisted}</p>

    <p><strong>Success Rate:</strong>
    ${percentage}%</p>

    <p><strong>Recommendation:</strong>
    ${recommendation}</p>
`;
```

}
    displayCandidates();
}
document
.getElementById("searchCandidate")
.addEventListener("input", function() {

    const search =
    this.value.toLowerCase();

    const rows =
    document.querySelectorAll(
    "#candidateTable tr"
    );

    rows.forEach(row => {

        const text =
        row.innerText.toLowerCase();

        row.style.display =
        text.includes(search)
        ? ""
        : "none";

    });

});
