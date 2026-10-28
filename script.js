/* script.js - Copilot AI Dashboard Interactive Logic */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Toggle Setup
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('sidebar');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.remove('-translate-x-full');
        });
    }

    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
        });
    }

    // 2. Repositories Dropdown Logic
    const repoBtn = document.getElementById('repoBtn');
    const repoDropdown = document.getElementById('repoDropdown');
    const selectedRepoName = document.getElementById('selectedRepoName');
    const repoSearch = document.getElementById('repoSearch');
    const repoList = document.getElementById('repoList');

    if (repoBtn && repoDropdown) {
        repoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            repoDropdown.classList.toggle('hidden');
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!repoDropdown.contains(e.target) && !repoBtn.contains(e.target)) {
                repoDropdown.classList.add('hidden');
            }
        });
    }

    // Repository Search Filtering & Selection
    if (repoList) {
        const repoItems = repoList.querySelectorAll('.repo-item');
        
        repoItems.forEach(item => {
            item.addEventListener('click', () => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                const repoName = item.querySelector('.repo-name').textContent.trim();
                
                // Uncheck others (Single select behavior)
                repoItems.forEach(i => {
                    const cb = i.querySelector('input[type="checkbox"]');
                    if (cb) cb.checked = false;
                });

                if (checkbox) checkbox.checked = true;
                if (selectedRepoName) selectedRepoName.textContent = repoName;
                
                // Auto hide after selection
                setTimeout(() => {
                    if (repoDropdown) repoDropdown.classList.add('hidden');
                }, 200);
            });
        });

        if (repoSearch) {
            repoSearch.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                repoItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(term)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }

    // 3. Quick Action Buttons (Debug, Agent, Write Code, Issue, Git)
    window.insertAction = function(actionText) {
        const input = document.getElementById('promptInput');
        if (input) {
            input.value = `[${actionText}] ` + input.value;
            input.focus();
        }
    };

    // 4. Issue Modal Logic
    window.openIssueModal = function() {
        const modal = document.getElementById('issueModal');
        if (modal) modal.classList.remove('hidden');
    };

    window.closeIssueModal = function() {
        const modal = document.getElementById('issueModal');
        if (modal) modal.classList.add('hidden');
    };

    // 5. Submit Issue
    const issueForm = document.getElementById('issueForm');
    if (issueForm) {
        issueForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('ইস্যু সফলভাবে তৈরি হয়েছে!');
            closeIssueModal();
        });
    }

    // 6. Send Prompt Function
    const sendBtn = document.getElementById('sendBtn');
    const promptInput = document.getElementById('promptInput');
    const chatContainer = document.getElementById('chatContainer');

    function handleSend() {
        if (!promptInput) return;
        const text = promptInput.value.trim();
        if (!text) return;

        // Add user message to screen
        if (chatContainer) {
            const userMsg = document.createElement('div');
            userMsg.className = 'w-full max-w-3xl mb-4 p-4 rounded-xl bg-slate-800/80 text-gray-200 border border-slate-700/50 self-center text-sm';
            userMsg.innerHTML = `<span class="text-blue-400 font-semibold block mb-1">User Command:</span> ${text}`;
            chatContainer.appendChild(userMsg);

            // Response AI Indicator
            const aiMsg = document.createElement('div');
            aiMsg.className = 'w-full max-w-3xl mb-4 p-4 rounded-xl bg-blue-950/30 text-blue-200 border border-blue-800/40 text-sm';
            aiMsg.innerHTML = `<span class="text-cyan-400 font-semibold block mb-1">Copilot Agent:</span> প্রসেস করা হচ্ছে... রিপোজিটরিটি স্ক্যান করা হচ্ছে।`;
            chatContainer.appendChild(aiMsg);

            // Scroll down
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }

        promptInput.value = '';
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }

    if (promptInput) {
        promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
    }
});
      
