import { Icon } from 'icon/page';

interface ButtonProps{
  className?: string,
  txt?: string,
  color?: 'primary' | 'secondary' | 'glass',
  round?: boolean,
  size?: 'l' | 'm' | 's',
  iconName?: string,
  iconPosition?: 'l' | 'r',
  disabled?: boolean,
  onClick: () => void,
}
export function Button({
  className = '',
  txt = '',
  color = 'primary',
  round = false,
  size = 'l',
  iconName = '',
  iconPosition,
  disabled = false,
  onClick,
}: ButtonProps){
  const buttonColor = () => {
    switch(color){
      case 'primary':
        return 'bg-green-500 text-base-wf disabled:bg-opacity-32';
      case 'secondary':
        return 'border border-gray-400 text-gray-900';
      case 'glass':
        return 'bg-tp-wf bg-opacity-16 text-base-wf disabled:bg-opacity-24 disabled:text-opacity-32';
    }
  }

  const buttonSize = () => {
    switch(size){
      case 'l':
        return 'h-[48rem] px-[24rem]';
      case 'm':
        return 'h-[40rem] px-[20rem]';
      case 's':
        return 'h-[32rem] px-[16rem]';
    }
  }

  return(
    <button
      type='button'
      className={`inline-flex items-center gap-[6rem] text-[16rem] font-medium leading-[24rem] ${round ? 'rounded-[99rem]' : 'rounded-[8rem]'} ${buttonSize()} ${buttonColor()} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {iconPosition === 'l' && iconName && (
        <Icon
          name={iconName}
          size={16}
        />
      )}
      <span>{txt}</span>
      {iconPosition === 'r' && iconName && (
        <Icon
          name={iconName}
          size={16}
        />
      )}
    </button>
  );
}

interface TextButtonProps{
  className?: string,
  txt: string,
  color?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'retreative' | 'link',
  iconName?: string,
  iconPosition?: 'l' | 'r',
  disabled?: boolean,
  onClick: () => void,
}
export function TextButton({
  className = '',
  txt = '',
  color = 'primary',
  iconName = '',
  iconPosition,
  disabled = false,
  onClick,
  ...props
}: TextButtonProps){
  const buttonColor = () => {
    switch(color){
      case 'primary':
        return 'text-green-500';
      case 'secondary':
        return 'text-gray-900';
      case 'ghost':
        return 'text-tp-wf';
      case 'destructive':
        return 'text-semantic-r300';
      case 'retreative':
        return 'text-gray-600';
      case 'link':
        return 'text-semantic-b300 underline';
    }
  }

  return (
    <button 
      type='button' 
      className={`inline-flex items-center gap-[4rem] text-[14rem] leading-[20rem] font-medium disabled:text-gray-500 ${buttonColor()} ${className}`}
      disabled={disabled}
      onClick={onClick} 
      {...props}
    >
        {iconPosition === 'l' && iconName && (
            <Icon
              name={iconName}
              size={16}
            />
        )}
        <p className=''>{txt}</p>
        {iconPosition === 'r' && iconName && (
            <Icon
              name={iconName}
              size={16}
            />
        )}
    </button>
  );
}

interface IconButtonProps{
  className?: string;
  iconName: string;
  size?: 'l' | 'm' | 's' | 'xs';
  color?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'glass' | 'dark';
  shapeType?: 'square' | 'round';
  onClick: () => void;
}
export function IconButton({
  className = '', 
  iconName, 
  size = 'l', 
  color = 'primary', 
  shapeType = 'square',
  onClick, 
  ...props
}: IconButtonProps){
  const BtnSize = (size: any) => {
    switch (size) {
      case 'l':
        return { btnSize: `w-[48rem] rounded-[8rem]`, iconSize: 24 };
      case 'm':
        return { btnSize: `w-[40rem] rounded-[8rem]`, iconSize: 24 };
      case 's':
        return { btnSize: `w-[32rem] rounded-[4rem]`, iconSize: 24 };
      case 'xs':
        return { btnSize: `w-[20rem] rounded-[4rem]`, iconSize: 16 };
      default:
        return { btnSize: 'L', iconSize: 24 };
    }
  };
  
  const { btnSize, iconSize } = BtnSize(size);

  const buttonColor = () => {
    switch(color){
      case 'primary':
        return 'bg-green-500 text-base-wf disabled:bg-opacity-32';
      case 'secondary':
        return 'border border-gray-400 text-gray-900 disabled:text-gray-500';
      case 'tertiary':
        return 'text-tp-wf disabled:text-opaticy-32';
      case 'ghost':
        return 'border border-gray-400 text-gray-900 disabled:text-gray-500';
      case 'glass':
        return 'bg-tp-wf bg-opacity-16 text-base-wf disabled:bg-opacity-24 disabled:text-opacity-32';
      case 'dark':
        return 'bg-tp-bkf bg-opacity-85 text-base-wf disabled:bg-opacity-40 disabled:text-opacity-40';
    }
  }

  return (
    <>
        <button 
          type='button' 
          className={`aspect-square ${shapeType === 'round' && '!rounded-[99rem]'} ${btnSize} ${buttonColor()} ${className}`} 
          onClick={onClick} 
          {...props}
        >
          <Icon name={iconName} size={iconSize} className={`m-auto`} />
        </button>
    </>
  );
}