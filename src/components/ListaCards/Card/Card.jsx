import style from './Card.module.css';

const Card = ({valor, legenda, cor, title}) => {
    const getCor = (cor) => ['green', 'gray', 'red', 'blue'].includes(cor);

    const backgroundCor = getCor(cor) && style[cor];

    return (
        <section className={`${style.card} ${backgroundCor}`} title={title}>
            <h1>
                {
                    new Intl.NumberFormat("pt-br",
                        {
                            style: "currency",
                            currency: "BRL"
                        }
                    ).format(valor)
                }
            </h1>
            <span>{legenda}</span>
        </section>
    )
}

export default Card;