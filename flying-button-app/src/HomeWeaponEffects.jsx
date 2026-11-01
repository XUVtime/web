import { createRoot } from 'react-dom/client'
import FlyingButton from './components/FlyingButton.jsx'
import './home-widget.css'

function WeaponButton({ name, image, backdrop, href }) {
  return (
    <>
      <FlyingButton
        className="weapon-home-flight"
        style={backdrop ? {
          backgroundImage: `url("${backdrop}")`,
          backgroundSize: '250px 188px',
          backgroundPosition: 'center 127px',
          backgroundRepeat: 'no-repeat',
        } : undefined}
        theme="dark"
        size="medium"
        altitude={150}
        hoverTime={1.5}
        jets={2}
        thrusters
        trigger="hover"
        carryCursor
        smoke={1}
        turbulence={1}
        wobble={1}
        ramp={false}
        thrustColor="#8ec5ff"
        smokeColor="#eef1f6"
        onClick={() => {
          window.location.href = href
        }}
      >
        <span className={backdrop ? 'weapon-home-art weapon-home-art-ssg' : 'weapon-home-art'}>
          <img className="weapon-home-image" src={image} alt={name} />
        </span>
      </FlyingButton>
      <span className="weapon-name">{name}</span>
    </>
  )
}

const cards = document.querySelectorAll('.weapon-list [data-weapon]')

cards.forEach((card) => {
  const { name, image, backdrop, href } = card.dataset
  createRoot(card).render(
    <WeaponButton name={name} image={image} backdrop={backdrop} href={href} />,
  )
})