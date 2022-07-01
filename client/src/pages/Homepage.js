import React, { useEffect,useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Row,Col } from 'antd'
import Item from '../components/Item'
import '../resources/items.css'
import { useDispatch } from 'react-redux'
const Homepage = () => {
   const [itemsData,setItemsData] = useState([])
   const [selectedCategory,setSelectedCategory]=useState('fruits')
   const categories = [
      {
         name : 'fruits',
         imageURL : 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg',
      },
      {
         name : 'vegetables',
         imageURL : 'https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/643188-gettyimages-153946385-ca1ccfaad9be44325afc434b305adc0d.jpg',
      },
      {
         name : 'meat',
         imageURL : 'https://www.cityunbox.com/media/catalog/product/cache/65daba3010571badacafda02aba53f0a/m/i/mix_chicken.jpg',
      }
   ]
   const dispatch = useDispatch()
   const getAllItems= ()=>{
      dispatch({type:'showLoading'})
      axios.get('/api/items/get-all-items').then((res)=>{
           dispatch({type:'hideLoading'})
           setItemsData(res.data)
      }).catch((err)=>{
         dispatch({type:'hideLoading'})
         console.log(err)
      })
   }
  useEffect(()=>{                        
     getAllItems();
  },[])

  return (
     <DefaultLayout>
      <div className='d-flex categories'>
             {categories.map((category)=>{
               return <div 
               onClick={()=>setSelectedCategory(category.name)}
               className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`} >
                     <h4>{category.name}</h4>
                     <img src={category.imageURL} height='60' width='80' />
               </div>
             })}
      </div>
       <Row gutter={20}>{itemsData.filter((i)=>i.category===selectedCategory).map((item)=>{
           return <Col  xs={24} lg={6} md={12} sm={6}>
            <Item item={item}/>
           </Col>
       })}
       </Row>
     </DefaultLayout>
  )
}

export default Homepage