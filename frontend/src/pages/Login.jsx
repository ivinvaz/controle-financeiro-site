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
        register('email', {required: 'E-mail é obrigatório.'});
        register('senha', {required: 'Senha é obrigatória.'});
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
                                tipo='form'
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
