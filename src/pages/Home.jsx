import SiteHeader from '../components/SiteHeader'
import Hero from '../components/Hero'
import Manifesto from '../components/Manifesto'
import CategorySection from '../components/CategorySection'
import CartDrawer from '../components/CartDrawer'
import SiteFooter from '../components/SiteFooter'
import { usePlants } from '../context/PlantsContext'
import { CATEGORIES } from '../data/seedPlants'

export default function Home() {
  const { plants } = usePlants()

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        {CATEGORIES.map((category) => (
          <CategorySection key={category.id} category={category} plants={plants} />
        ))}
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  )
}
