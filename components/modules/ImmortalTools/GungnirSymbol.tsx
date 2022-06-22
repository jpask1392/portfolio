interface Props {
  classes?: string
}

const GungnirSymbol: React.FC<Props> = ({ classes }) => {
  return (
    <svg className={classes} viewBox="0 0 603 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_210_167)">
        <path d="M81.1331 358H3L215.805 3L373 260.221" stroke="#303030" strokeWidth="3" strokeMiterlimit="10"/>
        <path d="M346.347 69.8332L386.872 3L600 358H290" stroke="#303030" strokeWidth="3" strokeMiterlimit="10"/>
        <path d="M242.58 242L88 499H520L477.678 433.321" stroke="#303030" strokeWidth="3" strokeMiterlimit="10"/>
      </g>
      <defs>
      <clipPath id="clip0_210_167">
        <rect width="603" height="500" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
}

export default GungnirSymbol;
