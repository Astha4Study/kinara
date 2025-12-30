import logo from '@/assets/svg/logo.svg';

export default function AppLogo() {
    return (
        <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="Logo Kinara" className="h-10 w-auto" />
        </div>
    );
}
