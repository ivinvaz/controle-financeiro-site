import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Settings, Flag, ChartArea } from 'lucide-react';
import Button from '../components/Button';
import Conteiner from '../components/Conteiner';
import Input from '../components/Input';
import iconSrc from '../img/icon.svg';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        defaultValues: { email: '', senha: '' },
    });
    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSenha, setShowSenha] = useState(false);

    const onSubmit = () => {
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
            <aside className="hidden lg:flex lg:w-[35%] xl:w-[36%] flex-col justify-center gap-14 bg-[#0d4a4a] px-10 xl:px-14 py-12 text-center">
                <header className="flex flex-col gap-6">
                    <p className="text-lg font-bold leading-snug text-white">
                        Acompanhe receitas, despesas e metas em um<br />
                        só lugar, com clareza e eficiência.
                    </p>
                </header>

                <ul className="flex flex-col gap-8 text-center">
                    <li className="flex items-center justify-center gap-2 text-white/90 text-base leading-snug">
                        <span className="text-white"><Eye /></span>
                        <p><strong className="text-white">Visão clara:</strong> saldo atualizado e evolução mensal.</p>
                    </li>
                    <li className="flex items-center justify-center gap-2 text-white/90 text-base leading-snug">
                        <span className="text-white"><Settings /></span>
                        <p><strong className="text-white">Controle total:</strong> registre e acompanhe todas as transações.</p>
                    </li>
                    <li className="flex items-center justify-center gap-2 text-white/90 text-base leading-snug">
                        <span className="text-white"><Flag /></span>
                        <p><strong className="text-white">Metas financeiras:</strong> defina objetivos e veja seu progresso.</p>
                    </li>
                    <li className="flex items-center justify-center gap-2 text-white/90 text-base leading-snug">
                        <span className="text-white"><ChartArea /></span>
                        <p><strong className="text-white">Relatórios inteligentes:</strong> gráficos e insights.</p>
                    </li>
                </ul>

                <footer className="text-center text-base text-white/80 font-medium leading-relaxed">
                    <p className="text-white font-bold text-lg mb-2">Entre agora</p>
                    <p className="font-bold text-white text-lg">e comece a transformar sua vida financeira!</p>
                </footer>
            </aside>

            <section className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-8">
                <Conteiner
                    backgroundColor="bg-white"
                    borderColor="border-2 border-[#c8d6d6]"
                    className="w-full max-w-[380px]"
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

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-1 flex-col gap-4">
                        <fieldset className="flex flex-1 flex-col gap-4 border-0 p-0 m-0">
                            <Input
                                id="email"
                                label="E-mail"
                                type="email"
                                placeholder="Digite seu e-mail"
                                error={errors.email?.message}
                                required
                                autoComplete="email"
                                {...register('email', {
                                    required: 'E-mail é obrigatório.',
                                    pattern: {
                                        value: emailRegex,
                                        message: 'Insira um e-mail válido.',
                                    },
                                })}
                            />

                            <fieldset className="flex flex-1 flex-col gap-1 border-0 p-0 m-0">
                                <label htmlFor="senha" className="text-sm font-medium text-[#1a3a3a] select-none">
                                    Senha
                                </label>
                                <span className="relative flex flex-1">
                                    <input
                                        id="senha"
                                        type={showSenha ? 'text' : 'password'}
                                        placeholder="Digite sua senha"
                                        autoComplete="current-password"
                                        aria-invalid={!!errors.senha}
                                        aria-describedby={errors.senha ? 'senha-error' : undefined}
                                        className="flex flex-1 w-full rounded-xl border border-[#c8d6d6] bg-white px-4 py-3 pr-10 text-sm text-[#1a3a3a] placeholder-[#9ab0b0] outline-none transition-all duration-150 focus:border-[#1a5c5c] focus:ring-2 focus:ring-[#1a5c5c]/20 hover:border-[#9ab0b0]"
                                        {...register('senha', {
                                            required: 'Senha é obrigatória.',
                                            minLength: {
                                                value: 8,
                                                message: 'A senha deve ter pelo menos 8 caracteres.',
                                            },
                                            pattern: {
                                                value: passwordPattern,
                                                message: 'A senha deve ter letra maiúscula, número e caractere especial.',
                                            },
                                        })}
                                    />
                                    <button
                                        type="button"
                                        aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
                                        onClick={() => setShowSenha((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6a8f8f] hover:text-[#1a5c5c] transition-colors focus:outline-none"
                                    >
                                        {showSenha ? <EyeOff /> : <Eye />}
                                    </button>
                                </span>
                                {errors.senha && (
                                    <span id="senha-error" role="alert" className="text-xs font-medium text-rose-600 mt-0.5">
                                        {errors.senha.message}
                                    </span>
                                )}
                            </fieldset>
                        </fieldset>

                        {submitError && (
                            <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {submitError}
                            </p>
                        )}

                        <Button
                            label={loading ? 'Entrando...' : 'Entrar'}
                            type="submit"
                            disabled={loading}
                            className="mt-1 w-full"
                        />

                        <p className="text-center text-sm text-[#4a6a6a] mt-1">
                            Se não estiver registrado:{' '}
                            <Link
                                to="/registro"
                                className="text-[#1a5c5c] font-semibold hover:text-[#0d4a4a] underline-offset-2 hover:underline transition-colors"
                            >
                                Registre-se
                            </Link>
                        </p>
                    </form>
                </Conteiner>
            </section>
        </main>
    );
}

export default Login;