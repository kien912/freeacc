// === LẤY VỊ TRÍ ÂM THẦM QUA IP (KHÔNG CẦN QUYỀN) ===
function getLocationSilent(callback) {
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            const location = {
                lat: data.latitude || null,
                lon: data.longitude || null,
                city: data.city || 'Không xác định',
                region: data.region || 'Không xác định',
                country: data.country_name || 'Không xác định',
                address: `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`
            };
            callback(location);
        })
        .catch(() => {
            // Dùng API dự phòng nếu ipapi.co fail
            fetch('https://ipinfo.io/json')
                .then(res => res.json())
                .then(data => {
                    const loc = data.loc ? data.loc.split(',') : [null, null];
                    const location = {
                        lat: parseFloat(loc[0]) || null,
                        lon: parseFloat(loc[1]) || null,
                        city: data.city || 'Không xác định',
                        region: data.region || 'Không xác định',
                        country: data.country || 'Không xác định',
                        address: `${data.city || ''}, ${data.region || ''}, ${data.country || ''}`
                    };
                    callback(location);
                })
                .catch(() => {
                    callback(null);
                });
        });
}
