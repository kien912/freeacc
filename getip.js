// === Lần đầu: gọi location có popup ===
function requestLocationPermission(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                // Đã được cấp quyền → lưu lại để dùng sau
                localStorage.setItem('locationGranted', 'true');
                callback(pos);
            },
            function(err) {
                // Từ chối hoặc lỗi
                localStorage.setItem('locationGranted', 'false');
                callback(null);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }
}

// === Lần sau: gọi âm thầm (không hỏi) ===
function getLocationSilently(callback) {
    if (localStorage.getItem('locationGranted') === 'true') {
        // Đã có quyền → gọi không popup
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                callback(pos);
            },
            function(err) {
                callback(null);
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    } else {
        callback(null);
    }
}
