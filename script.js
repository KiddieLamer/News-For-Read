document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLightMode();
    initializeReportForm();
    initializeNotifications();
    initializeSmoothScroll();
});

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => span.style.transform = '');
                spans[1].style.opacity = '1';
            }
        });
    });
}

function initializeLightMode() {
    const lightModeToggle = document.getElementById('lightModeToggle');
    const body = document.body;
    
    const isLightMode = localStorage.getItem('lightMode') === 'true';
    if (isLightMode) {
        body.classList.add('light-mode');
        lightModeToggle.classList.add('active');
        lightModeToggle.innerHTML = '<i class="fas fa-wifi"></i> Mode Normal';
    }

    lightModeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        const isActive = body.classList.contains('light-mode');
        
        this.classList.toggle('active', isActive);
        this.innerHTML = isActive ? 
            '<i class="fas fa-wifi"></i> Mode Normal' : 
            '<i class="fas fa-wifi"></i> Mode Ringan';
        
        localStorage.setItem('lightMode', isActive);
        
        showMessage(isActive ? 
            'Mode ringan diaktifkan. Gambar disembunyikan untuk menghemat kuota.' : 
            'Mode normal diaktifkan. Gambar ditampilkan kembali.',
            'success'
        );
    });
}

function initializeReportForm() {
    const reportForm = document.getElementById('reportForm');
    
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const reportData = {
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            location: formData.get('location'),
            photos: formData.getAll('photo'),
            timestamp: new Date().toISOString()
        };

        if (!validateReportForm(reportData)) {
            return;
        }

        submitReport(reportData);
    });

    const photoInput = document.getElementById('reportPhoto');
    photoInput.addEventListener('change', function() {
        validatePhotos(this.files);
    });
}

function validateReportForm(data) {
    if (!data.title.trim()) {
        showMessage('Judul laporan harus diisi', 'error');
        return false;
    }

    if (!data.category) {
        showMessage('Kategori harus dipilih', 'error');
        return false;
    }

    if (!data.description.trim()) {
        showMessage('Deskripsi masalah harus diisi', 'error');
        return false;
    }

    return true;
}

function validatePhotos(files) {
    const maxFiles = 3;
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (files.length > maxFiles) {
        showMessage(`Maksimal ${maxFiles} foto dapat diunggah`, 'error');
        document.getElementById('reportPhoto').value = '';
        return false;
    }

    for (let file of files) {
        if (file.size > maxSize) {
            showMessage(`Ukuran file ${file.name} terlalu besar (maksimal 2MB)`, 'error');
            document.getElementById('reportPhoto').value = '';
            return false;
        }
    }

    return true;
}

function submitReport(data) {
    const submitBtn = document.querySelector('#reportForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
    submitBtn.disabled = true;

    setTimeout(() => {
        const reports = JSON.parse(localStorage.getItem('villageReports') || '[]');
        reports.push({
            id: Date.now(),
            ...data,
            status: 'pending'
        });
        localStorage.setItem('villageReports', JSON.stringify(reports));

        showMessage('Laporan berhasil dikirim! Terima kasih atas partisipasi Anda.', 'success');
        document.getElementById('reportForm').reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Laporan Diterima', {
                body: 'Laporan Anda telah diterima dan akan segera ditindaklanjuti.',
                icon: '/favicon.ico'
            });
        }
    }, 2000);
}

function initializeNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    
    if (!('Notification' in window)) {
        notificationBtn.style.display = 'none';
        return;
    }

    updateNotificationStatus();

    notificationBtn.addEventListener('click', function() {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                updateNotificationStatus();
                if (permission === 'granted') {
                    showMessage('Notifikasi berhasil diaktifkan!', 'success');
                    new Notification('Portal Desa', {
                        body: 'Notifikasi telah diaktifkan. Anda akan mendapat pemberitahuan untuk siaran penting.',
                        icon: '/favicon.ico'
                    });
                }
            });
        } else if (Notification.permission === 'granted') {
            showMessage('Notifikasi sudah aktif', 'success');
        } else {
            showMessage('Notifikasi telah diblokir. Aktifkan melalui pengaturan browser.', 'error');
        }
    });
}

function updateNotificationStatus() {
    const notificationBtn = document.getElementById('notificationBtn');
    const broadcastContainer = document.querySelector('.broadcast-container');
    
    let statusDiv = broadcastContainer.querySelector('.notification-permission');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.className = 'notification-permission';
        broadcastContainer.insertBefore(statusDiv, broadcastContainer.firstChild);
    }

    if (Notification.permission === 'granted') {
        statusDiv.className = 'notification-permission granted';
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Notifikasi aktif';
        notificationBtn.innerHTML = '<i class="fas fa-bell"></i> Notifikasi Aktif';
        notificationBtn.disabled = true;
    } else if (Notification.permission === 'denied') {
        statusDiv.className = 'notification-permission denied';
        statusDiv.innerHTML = '<i class="fas fa-times-circle"></i> Notifikasi diblokir';
        notificationBtn.innerHTML = '<i class="fas fa-bell-slash"></i> Notifikasi Diblokir';
    } else {
        statusDiv.className = 'notification-permission';
        statusDiv.innerHTML = '<i class="fas fa-info-circle"></i> Aktifkan notifikasi untuk mendapat pemberitahuan siaran penting';
        notificationBtn.innerHTML = '<i class="fas fa-bell"></i> Aktifkan Notifikasi';
        notificationBtn.disabled = false;
    }
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

function showMessage(message, type = 'success') {
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}-message`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1002;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

function simulateLiveBroadcast() {
    const broadcastStatus = document.querySelector('.broadcast-status');
    broadcastStatus.className = 'broadcast-status live';
    broadcastStatus.innerHTML = '<i class="fas fa-circle"></i> <span>SIARAN LANGSUNG AKTIF</span>';
    
    const nextBroadcast = document.querySelector('.next-broadcast');
    nextBroadcast.innerHTML = `
        <h3>Siaran Sedang Berlangsung:</h3>
        <div class="broadcast-schedule">
            <div class="schedule-item">
                <div class="schedule-date">
                    <i class="fas fa-broadcast-tower"></i>
                    <span>Musyawarah Desa</span>
                </div>
                <div class="schedule-event">
                    <h4>Pembahasan Anggaran Desa 2025</h4>
                    <p>Diskusi program kerja dan alokasi dana pembangunan</p>
                    <span class="schedule-time">LIVE SEKARANG</span>
                </div>
            </div>
        </div>
    `;

    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Siaran Langsung Dimulai!', {
            body: 'Musyawarah desa sedang berlangsung. Klik untuk menyaksikan.',
            icon: '/favicon.ico'
        });
    }
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        simulateLiveBroadcast();
    }
});

function loadReportsFromStorage() {
    const reports = JSON.parse(localStorage.getItem('villageReports') || '[]');
    console.log('Laporan tersimpan:', reports);
    return reports;
}

function exportReports() {
    const reports = loadReportsFromStorage();
    if (reports.length === 0) {
        showMessage('Tidak ada laporan untuk diekspor', 'error');
        return;
    }

    const dataStr = JSON.stringify(reports, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `laporan-desa-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

const forumTopics = document.querySelectorAll('.topic-card .btn-outline');
forumTopics.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent === 'Bergabung') {
            this.textContent = 'Bergabung...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Tergabung';
                this.classList.remove('btn-outline');
                this.classList.add('btn-primary');
                showMessage('Berhasil bergabung dalam forum!', 'success');
                
                const statsSpan = this.parentElement.querySelector('.topic-stats');
                const currentCount = parseInt(statsSpan.textContent.match(/\d+/)[0]);
                statsSpan.textContent = `${currentCount + 1} anggota`;
            }, 1500);
        }
    });
});