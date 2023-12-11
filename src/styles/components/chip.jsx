import './chip.scss';

export default function Chip(img, alt, txt, onclick, ...porps) {
    return(
        <>
            <button className="chip" onClick={onclick} {...porps}>
                <img src={img} alt={alt} />
                <p>{txt}</p>
            </button>
        </>
    );
}