import './button.scss';
import Icon from 'styles/components/icon';

// prim button
const PrimButton = ({ title, type, onClick, icon, iconPosition, size, href, className, ...props}) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  // button size
  const BtnSize = (size) => {
    switch (size){
      case 'L':
        return 'L';
      case 'M':
        return 'M';
      case 'S':
        return 'S';
      default:
        return 'L';
    }
  };

  const btnSizeClass = BtnSize(size);

  const btntype = (type) => {
      switch (type){
        case 'primary':
          return 'primary';
        case 'secondary':
          return 'secondary';
        case 'glass':
          return 'glass';
        default:
          return 'primary';
      }
  };
  const btnTypeClass = btntype(type);

  if(isLink) {
    return (
        <>
          <a href={href} className={`btn_common prim_btn ${btnSizeClass} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
              {iconPosition === 'left' && icon && (
                  <Icon name={icon} size={16} className={`btn_icon`} />
              )}
              <p className='btn_tit'>{title}</p>
              {iconPosition === 'right' && icon && (
                  <Icon name={icon} size={16} className={`btn_icon`} />
              )}
          </a>
        </>
    );
  }

  return (
      <>
        <button type='button' className={`btn_common prim_btn ${btnSizeClass} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
            {iconPosition === 'left' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
        </button>
      </>
  );
}

// text button
const TextButton = ({ title, type, onClick, icon, iconPosition, size, href, className, ...props}) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  // button size
  const BtnSize = (size) => {
    switch (size){
      case 'L':
        return 'L';
      case 'M':
        return 'M';
      case 'S':
        return 'S';
      case 'XS':
        return 'XS';
      default:
        return 'L';
    }
  };

  const btnSizeClass = BtnSize(size);

  const btntype = (type) => {
      switch (type){
        case 'tertiary':
          return 'tertiary';
        case 'quaternary':
          return 'qaternary';
        case 'gray':
          return 'gray';
        default:
          return 'tertiary';
      }
  };
  const btnTypeClass = btntype(type);

  if(isLink) {
    return (
      <>
        <a href={href} className={`btn_common txt_btn ${btnSizeClass} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
            {iconPosition === 'left' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
        </a>
      </>
    );
  }

  return (
    <>
        <button type='button' className={`btn_common txt_btn ${btnSizeClass} ${btnTypeClass} ${className}`} onClick={onClick} {...props}>
            {iconPosition === 'left' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
        </button>
    </>
  );
}

// icon button
const IconButton = ({type, onClick, iconName, size, href, className, ...props}) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  // button size
  const BtnSize = (size) => {
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

  const btntype = (type) => {
      switch (type){
        case 'primary':
          return 'primary';
        case 'secondary':
          return 'secondary';
        case 'tertiary':
          return 'tertiary';
        case 'quaternary':
          return 'quaternary';
        default:
          return 'primary';
      }
  };
  const btnTypeClass = btntype(type);

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

export {
    PrimButton,
    TextButton,
    IconButton,
};

// example
// <PrimButton title='test' iconPosition='left' icon='Plus' type='primary'/>
// <PrimButton href='/' title='test' iconPosition='left' icon='Plus' type='primary'/>
// <IconButton iconName='Plus' type='glass' size='S' />
// <IconButton href={`/`} iconName='Plus' type='primary' size='L'/>
