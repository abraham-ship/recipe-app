import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const [, , removeCookie] = useCookies(['access_token']);
    const navigate = useNavigate();

    const logout = () => {
        removeCookie('access_token', { path: '/' });
        localStorage.removeItem('userID');
        navigate('/login');
    };

    return logout;
};

export default useLogout;
