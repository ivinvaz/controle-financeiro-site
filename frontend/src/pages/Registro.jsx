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

function SenhaInput({ id, label, error, placeholder, autoComplete, registerProps }) {
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
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="flex flex-1 w-full rounded-xl border border-[#c8d6d6] bg-white px-4 py-3 pr-10 text-sm text-[#1a3a3a] placeholder-[#9ab0b0] outline-none transition-all duration-150 focus:border-[#1a5c5c] focus:ring-2 focus:ring-[#1a5c5c]/20 hover:border-[#9ab0b0]"
                    {...registerProps}
                />
                <button
                    type="button"
                    aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6a8f8f] hover:text-[#1a5c5c] transition-colors focus:outline-none"
                >
                    {show ? <EyeOff /> : <Eye />}
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
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            nome: '',
            profissao: '',
            email: '',
            senha: '',
            confirmaSenha: '',
        },
    });
    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false);
    const senhaValue = watch('senha');

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

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-1 flex-col gap-4">
                        <fieldset className="flex flex-1 flex-col gap-4 border-0 p-0 m-0">
                            <Input
                                id="nome"
                                label="Nome"
                                placeholder=""
                                error={errors.nome?.message}
                                required
                                autoComplete="name"
                                {...register('nome', {
                                    required: 'Nome é obrigatório.',
                                    minLength: {
                                        value: 3,
                                        message: 'O nome deve ter pelo menos 3 caracteres.',
                                    },
                                })}
                            />
                            <Input
                                id="email"
                                label="E-mail"
                                type="email"
                                placeholder=""
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
                            <Input
                                id="profissao"
                                label="Profissão"
                                placeholder=""
                                error={errors.profissao?.message}
                                autoComplete="organization-title"
                                {...register('profissao', {
                                    minLength: {
                                        value: 3,
                                        message: 'A profissão deve ter pelo menos 3 caracteres.',
                                    },
                                })}
                            />
                            <SenhaInput
                                id="senha"
                                label="Senha"
                                placeholder=""
                                error={errors.senha?.message}
                                autoComplete="new-password"
                                registerProps={register('senha', {
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
                            <SenhaInput
                                id="confirmaSenha"
                                label="Confirme sua Senha"
                                placeholder=""
                                error={errors.confirmaSenha?.message}
                                autoComplete="new-password"
                                registerProps={register('confirmaSenha', {
                                    required: 'Confirme a senha.',
                                    validate: (value) =>
                                        value === senhaValue || 'As senhas precisam ser iguais.',
                                })}
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