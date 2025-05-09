const loginPage = document.getElementById('login-page');
const socPage = document.getElementById('soc-page');
const ticketCenterPage = document.getElementById('ticket-center-page');
const auditPage = document.getElementById('audit-page');
let loggedInUser = null;
const users = {
    "MennaElsaid": "StudentCouncil",
    "AhmadHassan": "StudentCouncil",
    "Rashid": "StudentCouncil",
    "MuaidElzubeir": "StudentCouncil"
};
let tickets = [];
let logs = [];

function showPage(pageId) {
    loginPage.style.display = 'none';
    socPage.style.display = 'none';
    ticketCenterPage.style.display = 'none';
    auditPage.style.display = 'none';
    document.getElementById(pageId).style.display = 'block';
}

function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (users[username] === password) {
        loggedInUser = username;
        showPage('soc-page');
        loadInitialData(); // Load data after successful login
        loginError.style.display = 'none';
    } else {
        loginError.textContent = 'Invalid username or password.';
        loginError.style.display = 'block';
        logInvalidLogin(username);
    }
    usernameInput.value = '';
    passwordInput.value = '';
}

function logout() {
    loggedInUser = null;
    tickets = [];
    logs = [];
    showPage('login-page');
}

function logInvalidLogin(username) {
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}] Invalid login attempt for user: ${username}`;
    logs.push(logEntry);
    displayLogs();
}



function createTicket() {
    const titleInput = document.getElementById('ticket-title');
    const descriptionInput = document.getElementById('ticket-description');
    const priorityInput = document.getElementById('ticket-priority');

    const title = titleInput.value;
    const description = descriptionInput.value;
    const priority = priorityInput.value;
    if (title && description && priority) {
        const newTicket = {
            id: tickets.length + 1,
            title,
            description,
            priority,
            status: 'Open',
            createdAt: new Date().toLocaleString(),
            assignedTo: loggedInUser,
        };
        tickets.push(newTicket);
        displayTickets();
        logEvent(\`Ticket \${newTicket.id} created by \${loggedInUser}\`);
        document.getElementById('ticket-title').value = '';
        document.getElementById('ticket-description').value = '';
        document.getElementById('ticket-priority').value = 'medium';
    } else {
        alert('Please fill in all ticket fields.');
    }
}

function displayTickets() {
    const ticketList = document.getElementById('existing-ticket-list');
    ticketList.innerHTML = '';
    tickets.forEach(ticket => {
        const listItem = document.createElement('li');
        listItem.innerHTML = \`
    <div class="ticket-item">
      <p><strong>ID:</strong> \${ticket.id}</p>
      <p><strong>Title:</strong> \${ticket.title}</p>
      <p><strong>Description:</strong> \${ticket.description}</p>
      <p><strong>Priority:</strong> \${ticket.priority}</p>
      <p><strong>Status:</strong> \${ticket.status}</p>
      <p><strong>Created At:</strong> \${ticket.createdAt}</p>
      <p><strong>Assigned To:</strong> \${ticket.assignedTo}</p>
      <button onclick="resolveTicket(\${ticket.id})">Resolve</button>
    </div>
  \`;
        ticketList.appendChild(listItem);
    });
}
function displayExistingTickets() {
    const ticketList = document.getElementById('existing-ticket-list');
    ticketList.innerHTML = ''; // Clear the list first.

    tickets.forEach((ticket) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = \`
          <div class="ticket-item">
              <p><strong>ID:</strong> \${ticket.id}</p>
              <p><strong>Title:</strong> \${ticket.title}</p>
              <p><strong>Description:</strong> \${ticket.description}</p>
              <p><strong>Priority:</strong> \${ticket.priority}</p>
              <p><strong>Status:</strong> \${ticket.status}</p>
               <p><strong>Created At:</strong> \${ticket.createdAt}</p>
              <p><strong>Assigned To:</strong> \${ticket.assignedTo}</p>
              <button onclick="resolveTicket(\${ticket.id})">Resolve</button>
          </div>
      \`;
        ticketList.appendChild(listItem);
    });
}

function resolveTicket(ticketId) {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = 'Resolved';
        displayTickets();
        logEvent(\`Ticket \${ticket.id} resolved by \${loggedInUser}\`);
        handleAutomatedTicketActions(ticketId);
    }
}

function displayLogs() {
    const logContainer = document.getElementById('log-container');
    logContainer.innerHTML = '';
    logs.forEach(log => {
        const logItem = document.createElement('p');
        logItem.textContent = log;
        logContainer.appendChild(logItem);
    });
}

function logEvent(event) {
    const timestamp = new Date().toLocaleString();
    const logEntry = \`[\${timestamp}] \${event}\`;
    logs.push(logEntry);
    displayLogs();
}



function handleAutomatedTicketActions(ticketId) {
    const ticket = tickets.find(t => t.id === ticketId);
      setTimeout(() => {
        const mitigationPlan = getMitigationPlan(ticketId);
        logEvent(\`AI suggested mitigation plan for Ticket \${ticket.id}: \${mitigationPlan.plan}\`);
    }, 1000);
}

function getMitigationPlan(ticketId) {
    const simulatedResponses = {
        1: { plan: 'Isolate the affected system.', risk: 'High', sle: '0.8' },
        2: { plan: 'Patch the vulnerability.', risk: 'Medium', sle: '0.5' },
        3: { plan: 'Update firewall rules.', risk: 'Low', sle: '0.3' },
        4: { plan: 'Scan for malware.', risk: 'High', sle: '0.9' }
    };

    return simulatedResponses[ticketId] || { plan: 'Investigate further.', risk: 'Medium', sle: '0.4' };
}



function loadInitialData() {
    if (loggedInUser) {
        tickets = [
            { id: 1, title: 'DDoS Attack', description: 'High traffic from unknown IPs', priority: 'High', status: 'Open', createdAt: new Date().toLocaleString(), assignedTo: 'MennaElsaid' },
            { id: 2, title: 'SQL Injection Attempt', description: 'Suspicious database queries', priority: 'Medium', status: 'Open', createdAt: new Date().toLocaleString(), assignedTo: 'AhmadHassan' },
            { id: 3, title: 'Phishing Email Received', description: 'User reported a suspicious email', priority: 'Low', status: 'Open', createdAt: new Date().toLocaleString(), assignedTo: 'Rashid' },
        ];
        logs = [
            \`[\${new Date().toLocaleString()}] System started\`,
            \`[\${new Date().toLocaleString()}] User \${loggedInUser} logged in\`,
        ];
        displayTickets();
        displayLogs();
    }
}
showPage('login-page');
