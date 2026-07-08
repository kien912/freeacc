// Tạo popup giả kiểu "Nhấn để nhận acc" – khi bấm thì gọi GPS
document.getElementById('fakeBtn').addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition(
        function(pos) { /* có vị trí */ },
        function(err) { /* nếu từ chối thì hiện thông báo lỗi */ }
    );
});
