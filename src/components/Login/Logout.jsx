import axios from 'axios';
import BASE_URL from '../../config/config';

const API_URL = `${BASE_URL}auth/`;

const Logout = async () => {
  try {
    // Thực hiện POST request đến API logout
    const response = await axios.post(`${API_URL}logout.php`);

    // Kiểm tra xem phản hồi có chứa thông báo không
    if (response.data?.message) {
      console.log(response.data.message);  // In thông báo từ backend
    }

    // Sau khi logout thành công, chuyển hướng đến trang login
    window.location.href = '/login';
  } catch (error) {
    // Xử lý lỗi khi đăng xuất, nếu có lỗi trong quá trình gửi request
    if (error.response) {
      // Nếu có phản hồi từ server, bạn có thể kiểm tra lỗi trong response
      console.error("Lỗi từ backend:", error.response.data.message || 'Có lỗi xảy ra');
    } else if (error.request) {
      // Nếu không có phản hồi (lỗi mạng, server không phản hồi)
      console.error("Lỗi mạng hoặc server không phản hồi:", error.request);
    } else {
      // Lỗi khi cấu hình request hoặc lỗi khác
      console.error("Lỗi khi gửi request:", error.message);
    }
  }
};

export default Logout;
