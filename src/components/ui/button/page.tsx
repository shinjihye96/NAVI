import styles from './page.module.scss' ;
import { Icon } from 'icon/page';

// prim button
interface PrimProps{
    title: string;
    btnType: string;
    onClick?: () => void;
    iconName?: string;
    iconPosition?: string;
    size?: string;
    href?: string;
    className?: string;
    round?: boolean;
}
export const PrimButton = ({
    title, 
    btnType='primary', 
    onClick, 
    iconName, 
    iconPosition, 
    size='L', 
    href, 
    className = '', 
    round = false,
    ...props
}: PrimProps) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  if(isLink) {
    return (
        <>
          <a 
            href={href} 
            className={`${styles.btn_common} ${styles.prim_btn} ${styles[size]} ${styles[btnType]} ${round ? styles.round_btn : ''} ${className}`}
            onClick={onClick}
            {...props}
          >
              {iconPosition === 'left' && iconName && (
                  <Icon name={iconName} size={16} className={`btn_icon`} />
              )}
              <p className='btn_tit'>{title}</p>
              {iconPosition === 'right' && iconName && (
                  <Icon name={iconName} size={16} className={`btn_icon`} />
              )}
          </a>
        </>
    );
  }

  return (
      <>
        <button 
          type='button' 
          className={`${styles.btn_common} ${styles.prim_btn} ${styles[size]} ${styles[btnType]} ${round ? styles.round_btn : ''} ${className}`} 
          onClick={onClick}
          {...props}
        >
            {iconPosition === 'left' && iconName && (
                <Icon name={iconName} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && iconName && (
                <Icon name={iconName} size={16} className={`btn_icon`} />
            )}
        </button>
      </>
  );
}

// text button
interface TextButtonProps{
    title: string;
    onClick: () => void;
    iconName?: string;
    iconPosition?: string;
    size?: string;
    btnType?: string;
    href?: string;
    className?: string;
}
export const TextButton = ({
    title, 
    onClick, 
    iconName, 
    iconPosition, 
    size='L', 
    btnType='tertiary' , 
    href, 
    className, 
    ...props
}: TextButtonProps) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  if(isLink) {
    return (
      <>
        <a href={href} className={`${styles.btn_common} txt_btn ${styles.size} ${styles.btnType} ${className}`} onClick={onClick} {...props}>
            {iconPosition === 'left' && iconName && (
                <Icon name={iconName} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && iconName && (
                <Icon name={iconName} size={16} className={`btn_icon`} />
            )}
        </a>
      </>
    );
  }

  return (
    <>
        <button type='button' className={`${styles.btn_common} txt_btn ${styles.size} ${styles.btnType} ${className}`} onClick={onClick} {...props}>
            {iconPosition === 'left' && iconName && (
                <Icon name={iconName} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && iconName && (
                <Icon name={iconName} size={16} className={`btn_icon`} />
            )}
        </button>
    </>
  );
}

// icon button
interface IconButtonProps{
    onClick: () => void;
    iconName: string;
    size?: string;
    href?: string;
    className?: string;
    btnType?: string;
}
export const IconButton = ({
    onClick, 
    iconName, 
    size='L', 
    href, 
    className, 
    btnType='primary', 
    ...props
}: IconButtonProps) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  // button size
  const BtnSize = (size: any) => {
    switch (size) {
      case 'L':
        return { btnSize: 'L', iconSize: 24 };
      case 'M':
        return { btnSize: 'M', iconSize: 22 };
      case 'S':
        return { btnSize: 'S', iconSize: 20 };
      default:
        return { btnSize: 'L', iconSize: 24 };
    }
  };
  
  const { btnSize, iconSize } = BtnSize(size);

  if(isLink) {
    return (
      <>
        <a href={href} className={`${styles.btn_common} icon_btn ${btnSize} ${styles.btnType} ${className}`} onClick={onClick} {...props}>
            <Icon name={iconName} size={iconSize} className={`btn_icon`} />
        </a>
      </>
    );
  }

  return (
    <>
        <button type='button' className={`${styles.btn_common} icon_btn ${btnSize} ${styles.btnType} ${className}`} onClick={onClick} {...props}>
          <Icon name={iconName} size={iconSize} className={`btn_icon`} />
        </button>
    </>
  );
}

// example
// <PrimButton title='test' iconPosition='left' icon='Plus' type='primary'/>
// <PrimButton href='/' title='test' iconPosition='left' icon='Plus' type='primary'/>
// <IconButton iconName='Plus' type='glass' size='S' />
// <IconButton href={`/`} iconName='Plus' type='primary' size='L'/>
