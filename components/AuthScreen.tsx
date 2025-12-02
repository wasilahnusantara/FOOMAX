
import React, { useState } from 'react';
import type { UserRole, User } from '../types';

interface AuthScreenProps {
    onLogin: (user: User) => void;
}

// Mock Data for Malaysia Locations & Availability
const MALAYSIA_LOCATIONS: Record<string, Record<string, { name: string, isTaken: boolean }[]>> = {
    "Selangor": {
        "Petaling": [
            { name: "Damansara Utama", isTaken: true }, 
            { name: "Subang Jaya", isTaken: false },
            { name: "Petaling Jaya", isTaken: true },
            { name: "Shah Alam Seksyen 7", isTaken: false }
        ],
        "Gombak": [
            { name: "Batu Caves", isTaken: false },
            { name: "Rawang", isTaken: false },
            { name: "Selayang", isTaken: true } 
        ]
    },
    "Kuala Lumpur": {
        "Wilayah Persekutuan": [
            { name: "Bangsar", isTaken: true },
            { name: "TTDI", isTaken: false },
            { name: "Bukit Bintang", isTaken: false },
            { name: "Setapak", isTaken: false }
        ]
    },
    "Johor": {
        "Johor Bahru": [
            { name: "Larkin", isTaken: false },
            { name: "Skudai", isTaken: true },
            { name: "Tebrau", isTaken: false }
        ]
    }
};

// LOGO FIXED: Updated with specific SVG code provided by user
const FoomaxLogoSmall = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="250" cy="220" r="160" stroke="#fcd64e" strokeWidth="20" fill="none" />
        <g transform="translate(0, -10)">
            <rect x="220" y="115" width="110" height="20" rx="10" fill="#1a7f64" />
            <path d="M185,115 L185,250 Q185,290 225,290 L260,290 A10,10 0 0,0 260,270 L225,270 Q205,270 205,250 L205,200 L185,200 Z" fill="#1a7f64" />
            <path d="M175,115 L175,180 Q175,200 195,200 L195,250 Q195,290 235,290 L235,290" fill="none" />
            <g fill="#1a7f64">
                <path d="M175,120 L175,170 Q175,185 185,185 L185,120 Z" />
                <path d="M190,120 L190,170 Q190,185 195,185 Q200,185 200,170 L200,120 Z" />
                <path d="M205,120 L205,170 Q205,185 210,185 Q215,185 215,170 L215,120 Z" />
                <path d="M195,180 L195,250 Q195,290 235,290 L265,290 A10,10 0 0,0 265,270 L235,270 Q215,270 215,250 L215,180 Z" />
            </g>
            <path d="M260,160 A50,50 0 1,1 260,260 A40,40 0 1,0 260,160 Z" fill="#fcd64e" transform="translate(15, 0)"/>
            <polygon points="300,175 306,190 322,190 310,200 314,215 300,205 286,215 290,200 278,190 294,190" fill="#fcd64e" transform="translate(5, -5)"/>
        </g>
        <text x="250" y="460" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="75px" fill="#1a7f64" textAnchor="middle">FOOMAX</text>
    </svg>
);

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [selectedRole, setSelectedRole] = useState<UserRole>('member');
    
    // Standard Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // OTP Form State
    const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    // Territory Selection State
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (mode === 'signup' && selectedRole === 'member') return;

        if (mode === 'signup' && selectedRole === 'territory') {
            if (!selectedState || !selectedDistrict || !selectedArea) {
                alert("Sila lengkapkan pilihan lokasi perwakilan (Negeri, Daerah, Kawasan).");
                return;
            }
        }

        const user: User = {
            name: name || (mode === 'login' ? 'Pengguna Kembali' : 'Pengguna Baru'),
            email: loginMethod === 'phone' ? phoneNumber : email,
            role: selectedRole
        };
        onLogin(user);
    };

    const handleRequestOtp = () => {
        if (!phoneNumber || phoneNumber.length < 9) {
            alert("Mohon masukkan nomor telepon yang valid.");
            return;
        }
        setIsOtpSent(true);
        alert("Kode OTP dikirim ke WhatsApp/SMS anda: 1234");
    };

    const handleVerifyOtp = () => {
        if (otp === '1234') { 
            const user: User = {
                name: mode === 'signup' ? 'Member Baru' : 'Member Kembali',
                email: `${phoneNumber}@foomax.user`,
                role: mode === 'signup' ? 'member' : selectedRole 
            };
            onLogin(user);
        } else {
            alert("Kode OTP salah. Coba lagi.");
        }
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(e.target.value);
        setSelectedDistrict('');
        setSelectedArea('');
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(e.target.value);
        setSelectedArea('');
    };

    const RoleCard: React.FC<{ role: UserRole, title: string, desc: string, icon: React.ReactNode, active: boolean }> = ({ role, title, desc, icon, active }) => (
        <div 
            onClick={() => {
                setSelectedRole(role);
                setIsOtpSent(false); 
                setOtp('');
                setSelectedState('');
                setSelectedDistrict('');
                setSelectedArea('');
            }}
            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-1 ${active ? 'border-brand-green-dark bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
        >
            <div className={`p-2 rounded-full ${active ? 'bg-brand-green-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                {icon}
            </div>
            <div>
                <h4 className={`font-bold text-xs ${active ? 'text-brand-green-dark' : 'text-gray-700'}`}>{title}</h4>
                <p className="text-[10px] text-gray-500">{desc}</p>
            </div>
        </div>
    );

    const renderTerritorySelection = () => (
        <div className="space-y-4 p-4 bg-orange-50 rounded-lg border border-orange-200 animate-fade-in mb-4">
            <h4 className="font-bold text-brand-green-dark text-sm flex items-center gap-2">
                <MapIcon /> Pilih Kawasan Jagaan
            </h4>
            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Negeri</label>
                <select value={selectedState} onChange={handleStateChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-green-dark" required>
                    <option value="">-- Pilih Negeri --</option>
                    {Object.keys(MALAYSIA_LOCATIONS).map(state => (<option key={state} value={state}>{state}</option>))}
                </select>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Daerah</label>
                <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedState} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-green-dark disabled:bg-gray-100" required>
                    <option value="">-- Pilih Daerah --</option>
                    {selectedState && Object.keys(MALAYSIA_LOCATIONS[selectedState]).map(district => (<option key={district} value={district}>{district}</option>))}
                </select>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Kawasan (Area)</label>
                <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} disabled={!selectedDistrict} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-green-dark disabled:bg-gray-100" required>
                    <option value="">-- Pilih Kawasan --</option>
                    {selectedState && selectedDistrict && MALAYSIA_LOCATIONS[selectedState][selectedDistrict].map((area) => (
                        <option key={area.name} value={area.name} disabled={area.isTaken} className={area.isTaken ? 'text-gray-400 bg-gray-50' : 'text-gray-900 font-medium'}>
                            {area.name} {area.isTaken ? '(Penuh)' : '(Tersedia)'}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );

    const renderMemberSignup = () => (
        <div className="space-y-4 animate-fade-in">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon (WhatsApp)</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon /></div>
                    <input type="tel" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ''))} placeholder="0812..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark text-lg" disabled={isOtpSent} />
                </div>
            </div>
            {isOtpSent && (
                <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Verifikasi (OTP)</label>
                    <input type="text" maxLength={4} value={otp} onChange={e => setOtp(e.target.value)} placeholder="1234" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark text-center tracking-widest text-lg" />
                    <p className="text-xs text-gray-500 mt-2 text-center">Tidak terima? <button className="text-brand-green-dark font-bold hover:underline" onClick={() => alert("OTP dikirim ulang!")}>Kirim Ulang</button></p>
                </div>
            )}
            {!isOtpSent ? (
                <button type="button" onClick={handleRequestOtp} className="w-full bg-brand-green-dark text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors mt-4 shadow-lg shadow-green-900/20">Minta Kode OTP</button>
            ) : (
                <button type="button" onClick={handleVerifyOtp} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors mt-4 shadow-lg shadow-orange-500/20">Verifikasi & Daftar</button>
            )}
            <p className="text-xs text-center text-gray-400 mt-2">Dengan mendaftar, Anda menyetujui Syarat & Ketentuan Foomax.</p>
        </div>
    );

    const renderStandardForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
             {mode === 'signup' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap / Bisnis</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark" />
                </div>
            )}
            {mode === 'signup' && selectedRole === 'territory' && renderTerritorySelection()}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark" />
            </div>
            <button type="submit" className="w-full bg-brand-green-dark text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors mt-6 shadow-lg shadow-green-900/20">
                {mode === 'login' ? 'Masuk ke Akun' : 'Lengkapi Pendaftaran'}
            </button>
        </form>
    );

    const renderLoginOptions = () => (
        <div className="space-y-4 animate-fade-in">
             <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                <button onClick={() => { setLoginMethod('email'); setIsOtpSent(false); setOtp(''); }} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${loginMethod === 'email' ? 'bg-white shadow-sm text-brand-green-dark' : 'text-gray-500'}`}>Via Email</button>
                <button onClick={() => { setLoginMethod('phone'); setIsOtpSent(false); setOtp(''); }} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${loginMethod === 'phone' ? 'bg-white shadow-sm text-brand-green-dark' : 'text-gray-500'}`}>Via No. HP</button>
            </div>
            {loginMethod === 'email' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark" /></div>
                    <button type="submit" className="w-full bg-brand-green-dark text-white font-bold py-3 rounded-lg hover:bg-opacity-90 shadow-lg">Masuk</button>
                </form>
            ) : (
                <div className="space-y-4">
                     <div><label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon /></div><input type="tel" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ''))} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark" disabled={isOtpSent} /></div></div>
                    {isOtpSent && (<div><label className="block text-sm font-medium text-gray-700 mb-1">Kode OTP</label><input type="text" maxLength={4} value={otp} onChange={e => setOtp(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark text-center tracking-widest" /></div>)}
                    {!isOtpSent ? (<button onClick={handleRequestOtp} className="w-full bg-brand-green-dark text-white font-bold py-3 rounded-lg hover:bg-opacity-90 shadow-lg">Kirim Kode OTP</button>) : (<button onClick={handleVerifyOtp} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 shadow-lg">Verifikasi & Masuk</button>)}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFCF5] flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-brand-green-light/30">
                
                {/* Left Side: BRANDING & INFO (TOP GRID) */}
                <div className="md:w-5/12 bg-gradient-to-br from-brand-green-dark to-[#042f2e] p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-10 -translate-y-10 blur-xl"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-green-light/20 rounded-full translate-x-10 translate-y-10 blur-xl"></div>
                    
                    {/* Updated Title Text */}
                    <div className="mb-8 z-10">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
                            Platform Agensi<br/>Kuliner Halal
                        </h2>
                        <div className="h-1 w-16 bg-brand-green-light mx-auto rounded-full"></div>
                    </div>

                    {/* Features List with Beautiful Layout */}
                    <div className="space-y-4 text-left w-full max-w-xs z-10">
                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 flex items-start gap-3 transform transition hover:scale-105">
                            <div className="mt-1 text-brand-green-light"><CheckCircleIcon /></div>
                            <div>
                                <p className="font-bold text-sm text-white">Akad Ju'alah & Wakalah</p>
                                <p className="text-xs text-gray-300">Transaksi sesuai syariah yang transparan.</p>
                            </div>
                        </div>
                         <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 flex items-start gap-3 transform transition hover:scale-105">
                            <div className="mt-1 text-brand-green-light"><CheckCircleIcon /></div>
                            <div>
                                <p className="font-bold text-sm text-white">Ekosistem Halal</p>
                                <p className="text-xs text-gray-300">Menjamin kehalalan dari hulu ke hilir.</p>
                            </div>
                        </div>
                         <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 flex items-start gap-3 transform transition hover:scale-105">
                            <div className="mt-1 text-brand-green-light"><CheckCircleIcon /></div>
                            <div>
                                <p className="font-bold text-sm text-white">Dana Tabarru'</p>
                                <p className="text-xs text-gray-300">Sebagian keuntungan untuk infaq komunitas.</p>
                            </div>
                        </div>
                    </div>
                    
                    <p className="mt-8 text-xs text-white/40 font-medium tracking-widest uppercase">Est. 2025</p>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-7/12 p-8 md:p-10">
                    <FoomaxLogoSmall className="h-32 w-auto mx-auto mb-6" />
                    
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
                        <button onClick={() => { setMode('login'); setIsOtpSent(false); setOtp(''); }} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'login' ? 'bg-white shadow-sm text-brand-green-dark' : 'text-gray-500 hover:text-gray-700'}`}>Masuk</button>
                        <button onClick={() => { setMode('signup'); setIsOtpSent(false); setOtp(''); }} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'signup' ? 'bg-white shadow-sm text-brand-green-dark' : 'text-gray-500 hover:text-gray-700'}`}>Daftar</button>
                    </div>

                    {mode === 'signup' && (
                         <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Saya ingin mendaftar sebagai:</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                <RoleCard role="member" title="Member" desc="Pembeli" active={selectedRole === 'member'} icon={<UserIcon />} />
                                <RoleCard role="marketer" title="Marketer" desc="Komisi 3%" active={selectedRole === 'marketer'} icon={<MegaphoneIcon />} />
                                <RoleCard role="runner" title="Runner" desc="Kurir" active={selectedRole === 'runner'} icon={<BikeIcon />} />
                                <RoleCard role="merchant" title="Merchant" desc="Penjual" active={selectedRole === 'merchant'} icon={<StoreIcon />} />
                                <RoleCard role="territory" title="Perwakilan" desc="Partner" active={selectedRole === 'territory'} icon={<MapIcon />} />
                                <RoleCard role="admin" title="Admin" desc="Pengurus" active={selectedRole === 'admin'} icon={<ShieldIcon />} />
                            </div>
                        </div>
                    )}
                    {mode === 'login' ? renderLoginOptions() : (selectedRole === 'member' ? renderMemberSignup() : renderStandardForm())}
                </div>
            </div>
        </div>
    );
};

// Icons
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" /></svg>;
const StoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>;
const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 10.332l0 .036a.993.993 0 01.11.454c.142 3.665 2.502 6.746 5.86 8.358a.997.997 0 00.866 0c3.359-1.612 5.718-4.693 5.86-8.358a.993.993 0 01.11-.454l0-.036A.996.996 0 0014.28 9.38 8.003 8.003 0 002.166 10.332zM9 13a1 1 0 11-2 0 1 1 0 012 0zm1-3V7a1 1 0 00-2 0v3a1 1 0 002 0z" clipRule="evenodd" /></svg>;
const BikeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-green-light" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;

export default AuthScreen;
