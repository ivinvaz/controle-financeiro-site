import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Conteiner from '../components/Conteiner';
import Input from '../components/Input';
import iconSrc from '../img/icon.svg';
const IconEye = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconEyeOff = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);
const IconEye2 = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /></svg>
);
const IconSettings = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>
);
const IconBarChart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" /></svg>
);


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegistro(values) {
    const errors = {};
    if (!values.nome.trim()) errors.nome = 'Nome é obrigatório.';
    if (!values.email.trim()) {
        errors.email = 'E-mail é obrigatório.';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Insira um e-mail válido.';
    }
    if (!values.senha.trim()) errors.senha = 'Senha é obrigatória.';
    if (!values.confirmaSenha.trim()) {
        errors.confirmaSenha = 'Confirme a senha.';
    } else if (values.senha !== values.confirmaSenha) {
        errors.confirmaSenha = 'As senhas precisam ser iguais.';
    }
    return errors;
}

/* Campo senha com toggle embutido */
function SenhaInput({ id, label, value, onChange, error, placeholder, autoComplete }) {
    const [show, setShow] = useState(false);
    return (
        <fieldset className="flex flex-1 flex-col gap-1 border-0 p-0 m-0">
            <label htmlFor={id} className="text-sm font-medium text-[#1a3a3a] select-none">
                {label}
            </label>
            <span className="relative flex flex-1">
                <input
                    id={id}
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="flex flex-1 w-full rounded-xl border border-[#c8d6d6] bg-white px-4 py-3 pr-10 text-sm text-[#1a3a3a] placeholder-[#9ab0b0] outline-none transition-all duration-150 focus:border-[#1a5c5c] focus:ring-2 focus:ring-[#1a5c5c]/20 hover:border-[#9ab0b0]"
                />
                <button
                    type="button"
                    aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6a8f8f] hover:text-[#1a5c5c] transition-colors focus:outline-none"
                >
                    {show ? <IconEyeOff /> : <IconEye />}
                </button>
            </span>
            {error && (
                <span id={`${id}-error`} role="alert" className="text-xs font-medium text-rose-600 mt-0.5">
                    {error}
                </span>
            )}
        </fieldset>
    );
}

function Registro() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        nome: '',
        profissao: '',
        email: '',
        senha: '',
        confirmaSenha: '',
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (key) => (event) => {
        setValues((prev) => ({ ...prev, [key]: event.target.value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
        setSubmitError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validateRegistro(values);
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }
        setLoading(true);
        setSubmitError('');
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('token', 'demo-token');
            navigate('/');
        }, 500);
    };

    return (
        <main className="min-h-screen flex bg-white">
            <aside className="hidden lg:flex lg:w-[35%] xl:w-[36%] flex-col justify-center gap-14 bg-[#0d4a4a] px-10 xl:px-14 py-12">
                <header className="flex flex-col gap-6">
                    <p className="text-lg font-bold leading-snug text-white">
                        Acompanhe receitas, despesas e metas em um<br />
                        só lugar, com clareza e eficiência.
                    </p>
                </header>

                <ul className="flex flex-col gap-8 text-center">
                    <li className="flex items-center justify-center gap-2 text-white/90 text-base leading-snug">
                        <span className="text-white"><IconEye2 /></span>
                        <p><strong className="text-white">Visão clara:</strong> saldo atualizado e evolução mensal.</p>
                    </li>
                    <li className="flex items-center justify-center gap-2 text-white/90 text-base leading-snug">
                        <span className="text-white"><IconSettings /></span>
                        <p><strong className="text-white">Controle total:</strong> registre e acompanhe todas as transações.</p>
                    </li>
                    <li className="flex items-center justify-center gap-2 text-white/90 text-base leading-snug">
                        <span className="text-white"><IconFlag /></span>
                        <p><strong className="text-white">Metas financeiras:</strong> defina objetivos e veja seu progresso.</p>
                    </li>
                    <li className="flex items-center justify-center gap-2 text-white/90 text-base leading-snug">
                        <span className="text-white"><IconBarChart /></span>
                        <p><strong className="text-white">Relatórios inteligentes:</strong> gráficos e insights.</p>
                    </li>
                </ul>

                <footer className="text-center text-base text-white/80 font-medium leading-relaxed">
                    <p className="text-white font-bold text-lg mb-2">Entre agora</p>
                    <p className="font-bold text-white text-lg">e comece a transformar sua vida financeira!</p>
                </footer>
            </aside>

            <section className="flex flex-1 items-center justify-center bg-white px-4 py-10 sm:px-8">
                <Conteiner
                    backgroundColor="bg-white"
                    borderColor="border-2 border-[#c8d6d6]"
                    className="w-full max-w-[400px]"
                >
                    <header className="flex flex-col items-center gap-2 mb-6">
                        <img
                            src={iconSrc}
                            alt="GranaBoard"
                            className="w-16 h-16 object-contain"
                            draggable={false}
                        />
                        <h1 className="text-xl font-bold text-[#0d4a4a] tracking-tight">GranaBoard</h1>
                    </header>

                    <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col gap-4">
                        <fieldset className="flex flex-1 flex-col gap-4 border-0 p-0 m-0">
                            <Input
                                id="nome"
                                label="Nome"
                                placeholder=""
                                value={values.nome}
                                onChange={handleChange('nome')}
                                error={errors.nome}
                                required
                                autoComplete="name"
                            />
                            <Input
                                id="email"
                                label="E-mail"
                                type="email"
                                placeholder=""
                                value={values.email}
                                onChange={handleChange('email')}
                                error={errors.email}
                                required
                                autoComplete="email"
                            />
                            <Input
                                id="profissao"
                                label="Profissão"
                                placeholder=""
                                value={values.profissao}
                                onChange={handleChange('profissao')}
                                autoComplete="organization-title"
                            />
                            <SenhaInput
                                id="senha"
                                label="Senha"
                                placeholder=""
                                value={values.senha}
                                onChange={handleChange('senha')}
                                error={errors.senha}
                                autoComplete="new-password"
                            />
                            <SenhaInput
                                id="confirmaSenha"
                                label="Confirme sua Senha"
                                placeholder=""
                                value={values.confirmaSenha}
                                onChange={handleChange('confirmaSenha')}
                                error={errors.confirmaSenha}
                                autoComplete="new-password"
                            />
                        </fieldset>

                        {submitError && (
                            <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {submitError}
                            </p>
                        )}

                        <Button
                            label={loading ? 'Registrando...' : 'Registrar'}
                            type="submit"
                            disabled={loading}
                            className="mt-1 w-full"
                        />

                        <p className="text-center text-sm text-[#4a6a6a] mt-1">
                            Se já for registrado:{' '}
                            <Link
                                to="/login"
                                className="text-[#1a5c5c] font-semibold hover:text-[#0d4a4a] underline-offset-2 hover:underline transition-colors"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </Conteiner>
            </section>
        </main>
    );
}

export default Registro;