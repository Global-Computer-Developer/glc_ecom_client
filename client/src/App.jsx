import React, { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'
import Header from './components/Home/Header'
import SideNav from './components/Home/SideNav'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Home/Footer'
import HeaderMain from './components/Home/HeaderMain'
import ScrollToTop from './components/Home/ScrollToTop'
import HeaderNavMobile from './components/Home/HeaderNavMobile'
import { CartProvider } from './context/CartContext'
import { useAuthContext } from './context/AuthContext'
import Loading from './Utilities/Loading'
import LoadingFull from './Utilities/LoadingFull'


// page import

const Login = lazy(() => import ('./pages/Login'))
const SignUp = lazy(() => import ('./pages/SignUp'))
const NoPage = lazy(() => import ('./pages/NoPage'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))
const AboutPage = lazy(() => import ('./pages/AboutPage'))
const CareerPage = lazy(() => import ('./pages/CareerPage'))
const ContactUs = lazy(() => import ('./pages/ContactUs'))
const PoliciesPage = lazy(() => import ('./pages/PoliciesPage'))
const CartPage = lazy(() => import ('./pages/CartPage'))
const WishlistPage = lazy(() => import ('./pages/WishlistPage'))
const CatPage = lazy(() => import ('./pages/CatPage'))
const Profile = lazy(() => import ('./pages/Profile'))
const ProductPage = lazy(() => import ('./pages/ProductPage'))
const OrderConfirmPage = lazy(() => import ('./pages/OrderConfirmPage'))
const CheckoutPage = lazy(() => import ('./pages/CheckoutPage'))
const Home = lazy(() => import ('./pages/Home'))




// component
// -- modal
const QuickView = lazy(() => import ('./components/Modal/QuickView'))

// -- dashboard
const DashboardDash = lazy(() => import ('./components/Dashboard/DashboardDash'))
const CategoryDash = lazy(() => import ('./components/Dashboard/Category/CategoryDash'))
const CategoryAddForm = lazy(() => import ('./components/Dashboard/Category/CategoryAddForm'))
const CategoryEditDash = lazy(() => import ('./components/Dashboard/Category/CategoryEditDash'))
const CategoryTable = lazy(() => import ('./components/Dashboard/Category/CategoryTable'))
const BrandDash = lazy(() => import ('./components/Dashboard/Brand/BrandDash'))
const BrandAddForm = lazy(() => import ('./components/Dashboard/Brand/BrandAddForm'))
const BrandEditForm = lazy(() => import ('./components/Dashboard/Brand/BrandEditForm'))
const BrandTable = lazy(() => import ('./components/Dashboard/Brand/BrandTable'))
const SliderDash = lazy(() => import ('./components/Dashboard/Slider/SliderDash'))
const SliderAddForm = lazy(() => import ('./components/Dashboard/Slider/SliderAddForm'))
const SliderEditDash = lazy(() => import ('./components/Dashboard/Slider/SliderEditDash'))
const SliderTable = lazy(() => import ('./components/Dashboard/Slider/SliderTable'))
const ProductDash = lazy(() => import ('./components/Dashboard/Product/ProductDash'))
const ProductAddForm = lazy(() => import ('./components/Dashboard/Product/ProductAddForm'))
const ProductEditDashForm = lazy(() => import ('./components/Dashboard/Product/ProductEditDashForm'))
const ProductTable = lazy(() => import ('./components/Dashboard/Product/ProductTable'))
const SideMenuDash = lazy(() => import ('./components/Dashboard/SideMenu/SideMenuDash'))
const SideMenuAddForm = lazy(() => import ('./components/Dashboard/SideMenu/SideMenuAddForm'))
const SideMenuEditForm = lazy(() => import ('./components/Dashboard/SideMenu/SideMenuEditForm'))
const SideMenuTable = lazy(() => import ('./components/Dashboard/SideMenu/SideMenuTable'))
const KeyFeatureDash = lazy(() => import ('./components/Dashboard/KeyFeature/KeyFeatureDash'))
const KeyFeatureTable = lazy(() => import ('./components/Dashboard/KeyFeature/KeyFeatureTable'))
const KeyFeatureEditDash = lazy(() => import ('./components/Dashboard/KeyFeature/KeyFeatureEditDash'))
const SpecificationDash = lazy(() => import ('./components/Dashboard/Specification/SpecificationDash'))
const SpecificationEditDash = lazy(() => import ('./components/Dashboard/Specification/SpecificationEditDash'))
const SpecificationTable = lazy(() => import ('./components/Dashboard/Specification/SpecificationTable'))
const OrderDash = lazy(() => import ('./components/Dashboard/Order/OrderDash'))
const OrderTable = lazy(() => import ('./components/Dashboard/Order/OrderTable'))
const OrderSingleUserDash = lazy(() => import ('./components/Dashboard/Order/OrderSingleUserDash'))


// -- profile
const ProfileInfo = lazy(() => import ('./components/ProfilePage/ProfileInfo'))
const ProfileOrder = lazy(() => import ('./components/ProfilePage/ProfileOrder'))








function App() {

  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showDpt, setShowDpt] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { pathname } = useLocation()

  const {user, onAuth} = useAuthContext()


  useEffect(() => {

    // show sub menu on mobile
    const submenu = document.querySelectorAll('.has-child a')

    function toggle (e) {
      e.preventDefault()
      submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null)
      if (this.closest('.has-child').classList != 'expand') {
          this.closest('.has-child').classList.toggle('expand')
      }
    }
    
    
    submenu.forEach((menu) => menu.addEventListener('click', toggle))
    
  },[])

  useEffect(() => {
    const localAuth = localStorage.getItem('glc_t')
    if (localAuth && localAuth != 'undefined') {
      onAuth(JSON.parse(localAuth))
    }
  }, [pathname])


  return (
    <div 
      className={`app ${showMenu ? `showmenu`: ``} ${showSearch ? `showsearch`: ``} ${showDpt ? `showdpt`: ``}`}
    >
      <Suspense fallback={<LoadingFull loading={true} />}>
      

      <CartProvider>

        {
          pathname !== '/signup' && pathname !== '/login' && pathname.slice(0,10) !== '/dashboard' &&
          <>
            <SideNav setShowMenu={setShowMenu} />
            <Header />
          </>
        }

        {/* header nav mobile sticky */}
        {
          pathname.slice(0,10) !== '/dashboard' &&
          <HeaderNavMobile 
            showCart={showCart} 
            setShowMenu={setShowMenu} 
            setShowCart={setShowCart} 
            />
        }
        
        {/* sticky header */}
        {
          pathname !== '/signup' && pathname !== '/login' && pathname.slice(0,10) !== '/dashboard' &&
          <HeaderMain
            showDpt={showDpt}
            setShowDpt={setShowDpt}
          />
        }
        <ScrollToTop />

        <main>
          <Routes>

            <Route path='/' element={<Home />}></Route>

            <Route path='/product/:id' element={<ProductPage />}></Route>

            <Route path='/category' element={<CatPage />}></Route>
            <Route path='/category/:cat/:page' element={<CatPage />}></Route>
            <Route path='/menu/:cat/:page' element={<CatPage />}></Route>
            <Route path='/menu/:name/:code/:brand/:page' element={<CatPage />}></Route>
            <Route path='/search/:query/:page' element={<CatPage />}></Route>
            <Route path='/featured/:page' element={<CatPage />}></Route>
            <Route path='/trending/:page' element={<CatPage />}></Route>


            <Route path='/wishlist' element={<WishlistPage />}></Route>

            <Route path='/cart' element={<CartPage />}></Route>

            <Route path='/checkout' element={<CheckoutPage />}></Route>

            <Route path='/order-confirm/:slug' element={<OrderConfirmPage />}></Route>

            <Route path='/contact' element={<ContactUs />}></Route>

            <Route path='/about' element={<AboutPage />}></Route>
            
            <Route path='/career' element={<CareerPage />}></Route>
            
            <Route path='/policies' element={<PoliciesPage />}></Route>

            {
              (user != 'undefined' || user.length == 0) &&
              <>
                <Route path='/signup' element={<SignUp />}></Route>
                <Route path='/login' element={<Login />}></Route>              
              </>
            }



            {
              user && 
              <Route path='/profile/:username' element={<Profile />}>
                <Route path='info' element={<ProfileInfo />} />
                <Route path='order' element={<ProfileOrder />} />
              </Route>
            }


            {/* dashboard */}
            {
              user && user.is_staff &&
                <Route path='/dashboard' element={<Dashboard />}>
                  <Route path='home' element={<DashboardDash/>} />
                  <Route path='category' element={<CategoryDash/>} >
                    <Route path='' element={<CategoryTable />} />
                    <Route path='add' element={<CategoryAddForm />} />
                    <Route path='edit/:id' element={<CategoryEditDash />} />
                  </Route>
                  <Route path='brand' element={<BrandDash/>} >
                    <Route path='' element={<BrandTable />} />
                    <Route path='add' element={<BrandAddForm />} />
                    <Route path='edit/:id' element={<BrandEditForm />} />
                  </Route>
                  <Route path='product' element={<ProductDash/>}>
                    <Route path='' element={<ProductTable />} />
                    <Route path='add' element={<ProductAddForm />} />
                    <Route path='edit/:id' element={<ProductEditDashForm />} />
                  </Route>
                  <Route path='key-feature' element={<KeyFeatureDash/>} >
                    <Route path='' element={<KeyFeatureTable />} />
                    <Route path='edit/:id' element={<KeyFeatureEditDash />} />
                  </Route>
                  <Route path='specification' element={<SpecificationDash/>} >
                    <Route path='' element={<SpecificationTable />} />
                    <Route path='edit/:id' element={<SpecificationEditDash />} />
                  </Route>
                  <Route path='slider' element={<SliderDash/>} >
                    <Route path='' element={<SliderTable />} />
                    <Route path='add' element={<SliderAddForm />} />
                    <Route path='edit/:id' element={<SliderEditDash />} />
                  </Route>
                  <Route path='side-menu' element={<SideMenuDash />} >
                    <Route path='' element={<SideMenuTable />} />
                    <Route path='add' element={<SideMenuAddForm />} />
                    <Route path='edit/:id' element={<SideMenuEditForm />} />
                  </Route>
                  <Route path='order' element={<OrderDash/>} >
                    <Route path='' element={<OrderTable />} />
                    <Route path=':id' element={<OrderSingleUserDash />} />
                  </Route>
                </Route>
            }

            <Route path='*' element={<NoPage />} ></Route>

          </Routes>

          {/* {
            pathname !== '/confirmation' && pathname !== '/signup' && pathname !== '/login' && 
              <Banner />
          } */}
          <QuickView />
        </main>

        
        {
          pathname !== '/confirmation' && pathname.slice(0,10) !== '/dashboard' &&
          <Footer 
            setShowMenu={setShowMenu}
            setShowSearch={setShowSearch} 
            setShowCart={setShowCart} 
          />
        }

      </CartProvider>

      </Suspense>
    </div>
  )
}



export default App