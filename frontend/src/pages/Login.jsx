import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Settings, Flag, ChartArea } from 'lucide-react';
import Button from '../components/Button';
import Conteiner from '../components/Conteiner';
import Input from '../components/Input';
import iconSrc from '../img/icon.svg';
import { loginUsuario } from '../services/UsuarioService';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        defaultValues: { email: '', senha: '' },
    });
    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        register('email', {
            required: 'E-mail é obrigatório.',
            pattern: {
                value: emailRegex,
                message: 'Insira um e-mail válido.',
            },
        });
        register('senha', {
            required: 'Senha é obrigatória.',
            minLength: {
                value: 8,
                message: 'A senha deve ter pelo menos 8 caracteres.',
            },
            pattern: {
                value: passwordPattern,
                message: 'A senha deve ter letra maiúscula, número e caractere especial.',
            },
        });
    }, [register]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if (!name) return;
        setValue(name, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    };

    const onSubmit = async (data) => {
        setSubmitError('');
        setLoading(true);

        try {
            await loginUsuario({
                email: data.email,
                senha: data.senha,
            });

            navigate('/');
        } catch (error) {
            setSubmitError(error.message || 'Nao foi possivel entrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
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
                <div className="w-full max-w-[380px]">
                    <Conteiner>
                        <header className="flex flex-col items-center gap-2 mb-6">
                            <img
                                src={iconSrc}
                                alt="GranaBoard"
                                className="w-16 h-16 object-contain"
                                draggable={false}
                            />
                            <h1 className="text-xl font-bold text-[#0d4a4a] tracking-tight">GranaBoard</h1>
                        </header>

                        <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} noValidate className="flex flex-1 flex-col gap-4">
                            <fieldset className="flex flex-1 flex-col gap-2 border-0 p-0 m-0">
                                <Input
                                    id="email"
                                    name="email"
                                    label="E-mail"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                />
                                {errors.email && (
                                    <span role="alert" className="px-2 text-xs font-medium text-rose-600">
                                        {errors.email.message}
                                    </span>
                                )}

                                <Input
                                    id="senha"
                                    name="senha"
                                    label="Senha"
                                    type="password"
                                    placeholder="Digite sua senha"
                                />
                                {errors.senha && (
                                    <span role="alert" className="px-2 text-xs font-medium text-rose-600">
                                        {errors.senha.message}
                                    </span>
                                )}
                            </fieldset>

                            {submitError && (
                                <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                    {submitError}
                                </p>
                            )}

                            <Button
                                label={loading ? 'Entrando...' : 'Entrar'}
                                name="entrar"
                                id="entrar"
                                disabled={loading}
                                grande
                                bgColor="#114B5F"
                                fontcolor="#fff"
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
                </div>
            </section>
        </main>
    );
}

export default Login;
