import FlyingButton from './components/FlyingButton.jsx'
import './weapon-gallery.css'

const weapons = [
  { name: 'AWP', image: '/weapons/weapon_awp_png.webp' },
  {
    name: 'SSG 08',
    image: '/weapons/weapon_ssg08_png.webp',
    backdrop: '/weapons/danking.jpg',
  },
  { name: 'G3SG1', image: '/weapons/weapon_g3sg1_png.webp' },
  { name: 'SCAR-20', image: '/weapons/weapon_scar20_png.webp' },
]

function WeaponGallery() {
  return (
    <main className="weapon-gallery">
      <h1>Weapon Gallery</h1>
      <div className="weapon-grid">
        {weapons.map((weapon) => (
          <article className="weapon-card" key={weapon.name}>
            <div className="flight-stage">
              <FlyingButton
                className="weapon-flight"
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
              >
                <span className={weapon.backdrop ? 'weapon-art ssg-art' : 'weapon-art'}>
                  {weapon.backdrop && (
                    <img className="weapon-backdrop" src={weapon.backdrop} alt="" />
                  )}
                  <img className="weapon-image" src={weapon.image} alt={weapon.name} />
                </span>
              </FlyingButton>
            </div>
            <h2>{weapon.name}</h2>
          </article>
        ))}
      </div>
    </main>
  )
}

export default WeaponGallery