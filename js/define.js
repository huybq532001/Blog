const API = axios.create({
  baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
});

const ACCESS_TOKEN = 'FE20_ACCESS_TOKEN';
const token = localStorage.getItem(ACCESS_TOKEN);

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('vi');

