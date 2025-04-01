let subjectCount = 0;

// Scroll to calculator function
function scrollToCalculator() {
    // Get the calculator section element
    const calculatorSection = document.getElementById('calculator-section');
    
    // Get the SGPA tab and content
    const sgpaTab = document.querySelector('[data-tab="sgpa"]');
    const sgpaContent = document.getElementById('sgpa-tab');
    
    if (sgpaTab && sgpaContent) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Activate SGPA tab
        sgpaTab.classList.add('active');
        sgpaContent.classList.add('active');
    }
    
    // Scroll to calculator section
    if (calculatorSection) {
        // Get navbar height for offset
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight : 0;
        
        // Calculate the final scroll position
        const elementPosition = calculatorSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        // Perform the scroll
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initializeTabs();
    
    // Initialize the first subject for SGPA calculator
    addSubject();
    
    // Initialize semester inputs for CGPA calculator
    updateSemesterInputs();
    
    // Initialize hybrid calculator form based on department and year
    const departmentSelect = document.getElementById('hybrid-department');
    const yearSelect = document.getElementById('hybrid-year');
    
    if (departmentSelect && yearSelect) {
        departmentSelect.addEventListener('change', updateHybridForm);
        yearSelect.addEventListener('change', updateHybridForm);
        // Initialize the form based on current selections
        updateHybridForm();
    }
    
    // Check for saved theme preference
    checkThemePreference();
    
    // Handle mobile menu toggle if needed
    const mobileBreakpoint = 768;
    
    function adjustForMobile() {
        if (window.innerWidth <= mobileBreakpoint) {
            // Add any mobile-specific adjustments here
            document.querySelectorAll('.hero-button').forEach(button => {
                button.style.width = '100%';
            });
        } else {
            // Reset styles for desktop
            document.querySelectorAll('.hero-button').forEach(button => {
                button.style.width = 'auto';
            });
        }
    }
    
    // Call on load
    adjustForMobile();
    
    // Call on resize
    window.addEventListener('resize', adjustForMobile);
    
    // Add click handler for Get Started button
    const getStartedButton = document.querySelector('a[href="#calculator-section"]');
    if (getStartedButton) {
        getStartedButton.addEventListener('click', scrollToCalculator);
    }
});

// Tab system functionality
function initializeTabs() {
    // Main tabs
    const tabs = document.querySelectorAll('.tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${target}-tab`).classList.add('active');
        });
    });
    
    // Internal calculator tabs
    const internalTabs = document.querySelectorAll('.internal-tabs .tab');
    const internalTabContents = document.querySelectorAll('.internal-tab-content');
    
    internalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-internal-tab');
            
            // Remove active class from all internal tabs and contents
            internalTabs.forEach(t => t.classList.remove('active'));
            internalTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked internal tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${target}-tab`).classList.add('active');
        });
    });
}

// Custom popup for authentication
function showAuthPopup(message, redirectUrl) {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'auth-popup-overlay';
    
    // Create popup container
    const popup = document.createElement('div');
    popup.className = 'auth-popup';
    
    // Popup content
    popup.innerHTML = `
        <div class="auth-popup-header">
            <h3>This page says</h3>
        </div>
        <div class="auth-popup-content">
            <p>${message}</p>
        </div>
        <div class="auth-popup-footer">
            <button class="auth-popup-btn">OK</button>
        </div>
    `;
    
    // Append popup to overlay
    overlay.appendChild(popup);
    
    // Append overlay to body
    document.body.appendChild(overlay);
    
    // Add CSS for popup (will be added to the style element we already create)
    const popupStyles = `
        .auth-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .auth-popup {
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            width: 90%;
            max-width: 500px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            animation: popup-appear 0.3s ease-out;
        }
        
        @keyframes popup-appear {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .auth-popup-header {
            padding: 15px 20px;
            background-color: var(--primary-color);
            color: white;
        }
        
        .auth-popup-header h3 {
            margin: 0;
            color: white;
            font-size: 18px;
            font-weight: 500;
        }
        
        .auth-popup-content {
            padding: 20px;
            text-align: center;
        }
        
        .auth-popup-content p {
            margin: 0;
            font-size: 16px;
            color: var(--text-color);
        }
        
        .auth-popup-footer {
            padding: 15px 20px;
            display: flex;
            justify-content: flex-end;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .auth-popup-btn {
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 5px;
            padding: 8px 20px;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .auth-popup-btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
        }
    `;
    
    // Append styles to the existing style element
    style.textContent += popupStyles;
    
    // Add event listener to button
    const okButton = popup.querySelector('.auth-popup-btn');
    okButton.addEventListener('click', () => {
        // Remove the popup
        document.body.removeChild(overlay);
        
        // Redirect if URL is provided
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    });
}

// Theme toggle functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    const themeIcon = document.querySelector('#theme-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

function checkThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('#theme-toggle i');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// SGPA Calculator Functions
function addSubject() {
    subjectCount++;
    const subjectsContainer = document.getElementById('subjects-container');
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';
    subjectDiv.innerHTML = `
        <div class="form-group">
            <label for="subjectName${subjectCount}">Subject Name:</label>
            <input type="text" id="subjectName${subjectCount}" placeholder="Enter Subject Name">
        </div>
        <div class="input-row">
            <div class="form-group">
                <label for="credits${subjectCount}">Credits:</label>
                <input type="number" id="credits${subjectCount}" placeholder="Enter Credits" min="1" max="5">
            </div>
            <div class="form-group">
                <label for="grade${subjectCount}">Grade:</label>
                <select id="grade${subjectCount}">
                    <option value="10">A+</option>
                    <option value="9">A</option>
                    <option value="8">B+</option>
                    <option value="7">B</option>
                    <option value="6">C+</option>
                    <option value="5">C</option>
                    <option value="4">D+</option>
                    <option value="3">D</option>
                    <option value="2">E</option>
                    <option value="0">F</option>
                    <option value="0">I</option>
                    <option value="0">X</option>
                </select>
            </div>
        </div>
        <button type="button" class="danger" onclick="removeThisSubject(this)"><i class="fas fa-trash"></i> Remove</button>
    `;
    subjectsContainer.appendChild(subjectDiv);
}

function removeThisSubject(button) {
    const subjectDiv = button.parentElement;
    subjectDiv.remove();
}

function calculateSGPA() {
    const subjectsContainer = document.getElementById('subjects-container');
    const subjects = subjectsContainer.getElementsByClassName('subject');
    let totalGradePoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < subjects.length; i++) {
        const subject = subjects[i];
        const creditsInput = subject.querySelector('input[type="number"]');
        const gradeSelect = subject.querySelector('select');
        
        if (creditsInput && gradeSelect) {
            const credits = parseFloat(creditsInput.value) || 0;
            const grade = parseFloat(gradeSelect.value) || 0;
            
            totalGradePoints += credits * grade;
            totalCredits += credits;
        }
    }

    const sgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <div class="result-value">Your SGPA: <span>${sgpa.toFixed(2)}</span></div>
        <div class="result-details">
            <div>Total Credits: ${totalCredits}</div>
            <div>Total Grade Points: ${totalGradePoints.toFixed(2)}</div>
        </div>
    `;
    
    // Animate the result
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
}

function clearAllSubjects() {
    const subjectsContainer = document.getElementById('subjects-container');
    subjectsContainer.innerHTML = '';
    document.getElementById('result').innerHTML = '';
    subjectCount = 0;
    addSubject();
}

// CGPA Calculator Functions
function updateSemesterInputs() {
    const year = document.getElementById('year').value;
    const semesterInputs = document.getElementById('semester-inputs');
    semesterInputs.innerHTML = '';

    let semesters = [];
    if (year === '1') {
        semesters = ['1st', '2nd'];
    } else if (year === '2') {
        semesters = ['3rd', '4th'];
    } else if (year === '3') {
        semesters = ['5th', '6th'];
    } else if (year === '4') {
        semesters = ['7th', '8th'];
    }

    semesters.forEach((semester, index) => {
        const semesterDiv = document.createElement('div');
        semesterDiv.className = 'form-group';
        semesterDiv.innerHTML = `
            <label for="sgpa${index + 1}">${semester} Semester SGPA:</label>
            <input type="number" id="sgpa${index + 1}" placeholder="Enter SGPA" min="0" max="10" step="0.01">
        `;
        semesterInputs.appendChild(semesterDiv);
    });
}

function calculateCGPA() {
    const year = document.getElementById('year').value;
    let totalSGPA = 0;
    let count = 0;
    let semesterCount = 2; // Each year has 2 semesters

    for (let i = 1; i <= semesterCount; i++) {
        const sgpa = parseFloat(document.getElementById(`sgpa${i}`).value) || 0;
        if (sgpa > 0) {
            totalSGPA += sgpa;
            count++;
        }
    }

    const cgpa = count > 0 ? totalSGPA / count : 0;
    const resultElement = document.getElementById('cgpa-result');
    resultElement.innerHTML = `
        <div class="result-value">Your CGPA: <span>${cgpa.toFixed(2)}</span></div>
        <div class="result-details">
            <div>Semesters Considered: ${count}</div>
            <div>Total SGPA Points: ${totalSGPA.toFixed(2)}</div>
        </div>
    `;
    
    // Animate the result
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
}

function clearAllSemesters() {
    const semesterInputs = document.getElementById('semester-inputs');
    const inputs = semesterInputs.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    document.getElementById('cgpa-result').innerHTML = '';
}

// Hybrid Subject Calculator Functions
function calculateHybridMarks() {
    // Get department, year, and semester
    const department = document.getElementById('hybrid-department').value;
    const year = parseInt(document.getElementById('hybrid-year').value);
    const semester = parseInt(document.getElementById('hybrid-semester').value);
    
    // Check which calculation method to use based on department and year
    if (department === 'CSE' && year >= 2) {
        // Use BE CSE logic for 2nd+ year
        calculateBeCseMarks();
    } else if (department === 'AIML' && year >= 2) {
        // Use CSE AIML logic for 2nd+ year
        calculateCseAimlMarks();
    } else {
        // Use the original calculation logic for other departments or 1st year
        calculateDefaultMarks();
    }
}

// Calculate marks using CSE AIML logic (as per the C++ code)
function calculateCseAimlMarks() {
    // Get input values
    const assignment = parseFloat(document.getElementById('aiml-assignment').value) || 0;
    const attendance = parseFloat(document.getElementById('aiml-attendance').value) || 0;
    const surpriseTest = parseFloat(document.getElementById('aiml-surprise-test').value) || 0;
    const quiz = parseFloat(document.getElementById('aiml-quiz').value) || 0;
    const mst1 = parseFloat(document.getElementById('aiml-mst1').value) || 0;
    const mst2 = parseFloat(document.getElementById('aiml-mst2').value) || 0;
    const endSem = parseFloat(document.getElementById('aiml-end-sem').value) || 0;
    const labMst = parseFloat(document.getElementById('aiml-lab-mst').value) || 0;
    
    // Get experiment marks
    let totalExperiment = 0;
    const experiments = [];
    for (let i = 1; i <= 10; i++) {
        const expMark = parseFloat(document.getElementById(`exp${i}`).value) || 0;
        experiments.push(expMark);
        totalExperiment += expMark;
    }
    
    // Calculate components as per the C++ code
    const assignmentScaled = (assignment / 12) * 6;
    const endSemScaled = (endSem / 40) * 20;
    const labMstScaled = (labMst / 15) * 4;
    const surpriseScaled = (surpriseTest / 12) * 4;
    
    // Average experiment marks (scaled to 20, considering each experiment is out of 30)
    const experimentScaled = (((totalExperiment / 10) / 30) * 20);
    
    // MST average
    const mstAvg = (mst1 + mst2) / 4;
    
    // Calculate total internal marks (exactly as in the C++ code, now with surprise test and quiz)
    const totalInternalMarks = assignmentScaled + mstAvg + attendance + experimentScaled + endSemScaled + labMstScaled + surpriseScaled + quiz;
    
    // Display the result
    const resultElement = document.getElementById('hybrid-result');
    resultElement.innerHTML = `
        <h3><i class="fas fa-chart-bar"></i> Internal Marks Calculation</h3>
        <div class="result-value">Total Internal Marks: <span>${totalInternalMarks.toFixed(2)}</span></div>
        <div class="result-details">
            <div class="result-component">
                <span>Assignment (scaled to 6): </span>
                <span>${assignmentScaled.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Attendance: </span>
                <span>${attendance.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Surprise Test (scaled to 4): </span>
                <span>${surpriseScaled.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Quiz (4): </span>
                <span>${quiz.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>MST Average: </span>
                <span>${mstAvg.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>End Sem Practical (scaled to 20): </span>
                <span>${endSemScaled.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Lab MST (scaled to 4): </span>
                <span>${labMstScaled.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Experiments (scaled to 20): </span>
                <span>${experimentScaled.toFixed(2)}</span>
            </div>
            <div class="result-component total">
                <span>Final Internal Marks: </span>
                <span>${totalInternalMarks.toFixed(2)}</span>
            </div>
        </div>
    `;
    
    // Animate the result
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
}

// Calculate marks using BE CSE logic
function calculateBeCseMarks() {
    // Get input values using the BE CSE calculation logic
    const assignment = parseFloat(document.getElementById('assignment').value) || 0;
    const attendance = parseFloat(document.getElementById('attendance').value) || 0;
    const surpriseTest = parseFloat(document.getElementById('surprise-test').value) || 0;
    const quiz = parseFloat(document.getElementById('quiz').value) || 0;
    const mst1 = parseFloat(document.getElementById('mst1').value) || 0;
    const mst2 = parseFloat(document.getElementById('mst2').value) || 0;
    const endSem = parseFloat(document.getElementById('end-sem').value) || 0;
    const worksheet1 = parseFloat(document.getElementById('worksheet1').value) || 0;
    const worksheet2 = parseFloat(document.getElementById('worksheet2').value) || 0;
    const worksheet3 = parseFloat(document.getElementById('worksheet3').value) || 0;
    const worksheet4 = parseFloat(document.getElementById('worksheet4').value) || 0;
    const classPerformance = parseFloat(document.getElementById('class-performance').value) || 0;
    const courseProject = parseFloat(document.getElementById('course-project').value) || 0;
    
    // Calculate components as per the C++ code
    const surpriseScaled = (surpriseTest / 12) * 4;
    const mstAvg = (mst1 + mst2) / 2;
    const worksheetTotal = ((worksheet1 + worksheet2 + worksheet3 + worksheet4) / 120) * 40;
    const classPerformanceScaled = (classPerformance / 10) * 10;
    const courseProjectScaled = (courseProject / 10) * 10;
    
    // Calculate total internal marks
    const totalInternalMarks = ((assignment + quiz + mstAvg + attendance + surpriseScaled + 
                               worksheetTotal + endSem + courseProjectScaled + 
                               classPerformanceScaled) / 140) * 70;
    
    // Display the result
    const resultElement = document.getElementById('hybrid-result');
    resultElement.innerHTML = `
        <h3><i class="fas fa-chart-bar"></i> Internal Marks Calculation</h3>
        <div class="result-value">Total Internal Marks: <span>${totalInternalMarks.toFixed(2)}</span></div>
        <div class="result-details">
            <div class="result-component">
                <span>Assignment (10): </span>
                <span>${assignment.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Attendance (2): </span>
                <span>${attendance.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Surprise Test (scaled to 4): </span>
                <span>${surpriseScaled.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Quiz (4): </span>
                <span>${quiz.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>MST Average: </span>
                <span>${mstAvg.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>End Sem Practical (40): </span>
                <span>${endSem.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Worksheets (scaled to 40): </span>
                <span>${worksheetTotal.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Class Performance (10): </span>
                <span>${classPerformanceScaled.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Course Project (10): </span>
                <span>${courseProjectScaled.toFixed(2)}</span>
            </div>
            <div class="result-component total">
                <span>Final Internal Marks (out of 70): </span>
                <span>${totalInternalMarks.toFixed(2)}</span>
            </div>
        </div>
    `;
    
    // Animate the result
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
}

// Calculate marks using the default logic
function calculateDefaultMarks() {
    // Get input values
    const assignment = parseFloat(document.getElementById('assignment').value) || 0;
    const attendance = parseFloat(document.getElementById('attendance').value) || 0;
    const caseStudy = parseFloat(document.getElementById('case-study').value) || 0;
    const mst1 = parseFloat(document.getElementById('mst1').value) || 0;
    const mst2 = parseFloat(document.getElementById('mst2').value) || 0;
    const endSem = parseFloat(document.getElementById('end-sem').value) || 0;
    const labMst = parseFloat(document.getElementById('lab-mst').value) || 0;
    const assessment1 = parseFloat(document.getElementById('assessment1').value) || 0;
    const assessment2 = parseFloat(document.getElementById('assessment2').value) || 0;
    const assessment3 = parseFloat(document.getElementById('assessment3').value) || 0;
    
    // Calculate components as per the original logic
    const assignmentMarks = (assignment / 12) * 6;
    const caseStudyMarks = (caseStudy / 16) * 8;
    const mstAverage = (mst1 + mst2) / 4;
    const endSemMarks = (endSem / 40) * 20;
    const labMstMarks = (labMst / 15) * 4;
    const assessmentAverage = ((assessment1 + assessment2 + assessment3) / 3);
    const assessmentMarks = (assessmentAverage / 15) * 20;
    
    // Calculate total internal marks
    const totalInternalMarks = assignmentMarks + attendance + caseStudyMarks + mstAverage + assessmentMarks + endSemMarks + labMstMarks;
    
    // Display the result
    const resultElement = document.getElementById('hybrid-result');
    resultElement.innerHTML = `
        <h3><i class="fas fa-chart-bar"></i> Internal Marks Calculation</h3>
        <div class="result-value">Total Internal Marks: <span>${totalInternalMarks.toFixed(2)}</span></div>
        <div class="result-details">
            <div class="result-component">
                <span>Assignment (6): </span>
                <span>${assignmentMarks.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Attendance: </span>
                <span>${attendance.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Case Study (8): </span>
                <span>${caseStudyMarks.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>MST Average: </span>
                <span>${mstAverage.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>End Sem Practical (20): </span>
                <span>${endSemMarks.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Lab MST (4): </span>
                <span>${labMstMarks.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Assessment (20): </span>
                <span>${assessmentMarks.toFixed(2)}</span>
            </div>
        </div>
    `;
    
    // Animate the result
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
}

function resetHybridForm() {
    const form = document.getElementById('hybrid-form');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    document.getElementById('hybrid-result').innerHTML = '';
}

// Utility functions
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.result-value {
    font-size: 24px;
    margin-bottom: 15px;
}

.result-value span {
    font-weight: 700;
    color: var(--primary-color);
}

.result-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 16px;
}

.result-component {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.result-component:last-child {
    border-bottom: none;
}
`;
document.head.appendChild(style);

// Function to update the hybrid form based on department and year selection
function updateHybridForm() {
    const department = document.getElementById('hybrid-department').value;
    const year = parseInt(document.getElementById('hybrid-year').value);
    
    // Get references to all component divs
    const defaultComponents = document.getElementById('default-components');
    const becseComponents = document.getElementById('be-cse-components');
    const aimlComponents = document.getElementById('cse-aiml-components');
    
    // Hide all component sections initially
    if (defaultComponents) defaultComponents.style.display = 'none';
    if (becseComponents) becseComponents.style.display = 'none';
    if (aimlComponents) aimlComponents.style.display = 'none';
    
    // Show the appropriate section based on department and year
    if (department === 'CSE' && year >= 2) {
        if (becseComponents) becseComponents.style.display = 'block';
    } else if (department === 'AIML' && year >= 2) {
        if (aimlComponents) aimlComponents.style.display = 'block';
    } else {
        if (defaultComponents) defaultComponents.style.display = 'block';
    }
}

// Theory Subjects Calculator Functions
function calculateTheoryMarks() {
    // Get input values
    const assignment = parseFloat(document.getElementById('theory-assignment').value) || 0;
    const attendance = parseFloat(document.getElementById('theory-attendance').value) || 0;
    const surpriseTest = parseFloat(document.getElementById('theory-surprise-test').value) || 0;
    const quiz = parseFloat(document.getElementById('theory-quiz').value) || 0;
    const mst1 = parseFloat(document.getElementById('theory-mst1').value) || 0;
    const mst2 = parseFloat(document.getElementById('theory-mst2').value) || 0;
    
    // Calculate components exactly as per the C++ code
    const surpriseScaled = (surpriseTest / 12) * 4;  // s = ((surprise_test)/12)*4
    const mstAvg = (mst1 + mst2) / 2;  // m = (mst_1 + mst_2)/2
    
    // Calculate total internal marks exactly as in the C++ code
    const totalInternalMarks = assignment + quiz + mstAvg + attendance + surpriseScaled;
    
    // Display the result
    const resultElement = document.getElementById('theory-result');
    resultElement.innerHTML = `
        <h3><i class="fas fa-chart-bar"></i> Theory Internal Marks Calculation</h3>
        <div class="result-value">Total Internal Marks: <span>${totalInternalMarks.toFixed(2)}</span></div>
        <div class="result-details">
            <div class="result-component">
                <span>Assignment: </span>
                <span>${assignment.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Attendance: </span>
                <span>${attendance.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Surprise Test (scaled to 4): </span>
                <span>${surpriseScaled.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Quiz: </span>
                <span>${quiz.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>MST Average: </span>
                <span>${mstAvg.toFixed(2)}</span>
            </div>
            <div class="result-component total">
                <span>Final Internal Marks: </span>
                <span>${totalInternalMarks.toFixed(2)}</span>
            </div>
        </div>
    `;
    
    // Animate the result
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
}

function resetTheoryForm() {
    // Reset all input fields
    const form = document.getElementById('theory-form');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Clear the result
    document.getElementById('theory-result').innerHTML = '';
}

// Practical Subjects Calculator Functions
function calculatePracticalMarks() {
    // Get department and year
    const department = document.getElementById('practical-department').value;
    const year = parseInt(document.getElementById('practical-year').value);
    
    // Only allow calculation for 1st year BE CSE and CSE AIML, and 2nd year CSE AIML
    if (department === 'CSE' && year > 1) {
        showAuthPopup('This calculator is only for 1st year BE CSE students.', null);
        return;
    }
    if (department === 'AIML' && year > 2) {
        showAuthPopup('This calculator is only for 1st and 2nd year CSE AIML students.', null);
        return;
    }
    
    // Get input values exactly as in the C++ code
    const labMst = parseFloat(document.getElementById('practical-lab-mst').value) || 0;
    const assessment1 = parseFloat(document.getElementById('practical-assessment1').value) || 0;
    const assessment2 = parseFloat(document.getElementById('practical-assessment2').value) || 0;
    const assessment3 = parseFloat(document.getElementById('practical-assessment3').value) || 0;
    const endSem = parseFloat(document.getElementById('practical-end-sem').value) || 0;
    
    // Calculate components exactly as per the C++ code
    const n = (labMst / 15) * 15;  // n = ((labmst)/15)*15
    const assessment = assessment1 + assessment2 + assessment3;  // Assessment = Assessment_1 + Assessment_2 + Assessment_3
    const total = assessment + n + endSem;  // total = Assessment + n + end
    
    // Display the result
    const resultElement = document.getElementById('practical-result');
    resultElement.innerHTML = `
        <h3><i class="fas fa-chart-bar"></i> Practical Internal Marks Calculation</h3>
        <div class="result-value">Total Internal Marks: <span>${total.toFixed(2)}</span></div>
        <div class="result-details">
            <div class="result-component">
                <span>Lab MST (scaled to 15): </span>
                <span>${n.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Assessment 1: </span>
                <span>${assessment1.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Assessment 2: </span>
                <span>${assessment2.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Assessment 3: </span>
                <span>${assessment3.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>Total Assessment: </span>
                <span>${assessment.toFixed(2)}</span>
            </div>
            <div class="result-component">
                <span>End Sem Practical: </span>
                <span>${endSem.toFixed(2)}</span>
            </div>
            <div class="result-component total">
                <span>Final Internal Marks: </span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    `;
    
    // Animate the result
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
}

function resetPracticalForm() {
    // Reset all input fields
    const form = document.getElementById('practical-form');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Clear the result
    document.getElementById('practical-result').innerHTML = '';
} 
