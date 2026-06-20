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
                <td>${candidate.status}</td>
                <td>
                    <button onclick="editCandidate(${index})">Edit</button>
                    <button onclick="deleteCandidate(${index})">Delete</button>
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
}
function clearAllData() {
    if (confirm("Are you sure you want to delete all candidates?")) {
        candidates = [];
        saveData();
        displayCandidates();
    }
}
