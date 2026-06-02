function Conteiner({
  children,
  backgroundColor = 'bg-white',
  borderColor = 'border-slate-200',
  className = '',
}) {
  return (
    <section
      className={[
        'flex flex-1 items-center justify-center',
        backgroundColor,
        className,
      ].join(' ')}
    >
      <article
        className={[
          'flex flex-1 flex-col',
          'rounded-2xl border',
          borderColor,
          'bg-white p-8 shadow-lg',
          'w-full',
        ].join(' ')}
      >
        {children}
      </article>
    </section>
  );
}

export default Conteiner;
