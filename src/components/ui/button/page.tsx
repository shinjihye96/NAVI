import './button.scss';
import {Icon} from 'icon/page';

// prim button
interface PrimProps{
    title: string;
    btnTypeClass: string;
    onClick?: () => void;
    iconName?: string;
    iconPosition?: string;
    size: string;
    href: string;
    className: string;
}
export const PrimButton = ({
    title, 
    btnTypeClass='primary', 
    onClick, 
    iconName, 
    iconPosition, 
    size='L', 
    href, 
    className, 
    ...props
}: PrimProps) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  if(isLink) {
    return (
        <>
          <a href={href} className={`btn_common prim_btn ${size} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
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
        <button type='button' className={`btn_common prim_btn ${size} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
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
    btnTypeClass?: string;
    href?: string;
    className?: string;
}
export const TextButton = ({
    title, 
    onClick, 
    iconName, 
    iconPosition, 
    size='L', 
    btnTypeClass='tertiary' , 
    href, 
    className, 
    ...props
}: TextButtonProps) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  if(isLink) {
    return (
      <>
        <a href={href} className={`btn_common txt_btn ${size} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
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
        <button type='button' className={`btn_common txt_btn ${size} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
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
    btnTypeClass?: string;
}
export const IconButton = ({
    onClick, 
    iconName, 
    size='L', 
    href, 
    className, 
    btnTypeClass='primary', 
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
        <a href={href} className={`btn_common icon_btn ${btnSize} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
            <Icon name={iconName} size={iconSize} className={`btn_icon`} />
        </a>
      </>
    );
  }

  return (
    <>
        <button type='button' className={`btn_common icon_btn ${btnSize} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
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
