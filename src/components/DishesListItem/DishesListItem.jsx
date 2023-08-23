import { React } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// let props = {   
//   dishes: dishes,
//   dish: dish,
// }  
// <-- when calling dishesListItem calling this component and passing sth we pass props, which is an object (props is the object) every time

function DishesListItem({ dish }) { //this is an object, and we can pass more than just taco, so long as we give it a name in return disheslist.jsx
  //each property is the name of a prop
  //function DishesListItem({taco, burger})  <-- destructuring object
  // const [dishList, setDishList] = useState([]);
  // const [dishName, setDishName] = useState('');
  // let dishItem = {dishName: dishName}
  console.log('DishesListItem:', dish);
  const dispatch = useDispatch();
  const [dishName, setDishName] = useState('')
  const [dishIngredients, setDishIngredients] = useState('');
  const [dishInstructions, setDishInstructions] = useState('');
  const [editDish, setEditDish] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(null);



  function updateDish() {
    let dish = {
      dish_name: dishName,
      ingredients: dishIngredients,
      instructions: dishInstructions
    }
    console.log(`error for circular: `, dish);
    // return 
    fetch(`/api/dishes/${isCurrentlyEditing}`, {
      method: 'PUT',
      body: JSON.stringify(dish),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      console.log(response);
      setIsEditing(false);
      setIsCurrentlyEditing(null);
      dispatch({ type: 'GET_DISHES' });
    })
      .catch((error) => {
        1
        console.error(error);
      });
  }//end updateTask()


  function getDish() {
    return fetch('/api/dishes/getDishes')
      .then(response => response.json())
      .catch((error) => {
        console.error('error', error);
      });
  }

  function deleteDish(id) {
    return fetch(`/api/dishes/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      console.log(response);
      dispatch({ type: 'GET_DISHES' })
    }).catch((error) => {
      console.error(error);
    })
  }

  function editDishFunction(id) {
    setIsEditing(true);
    setIsCurrentlyEditing(id);
  }



/////////
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
////////




  return (
    <div className="container">
      {isEditing === true ?
        <>
          <form onSubmit={updateDish}>{/* form to display when edit button is clicked  */}
            {/* <h2>editing: {isCurrentlyEditing}</h2> */}
            <textarea type="text" placeholder='dishName' value={dishName} onChange={(e) => { setDishName(e.target.value) }}></textarea>
            <textarea type="text" placeholder='ingredients' value={dishIngredients} onChange={(e) => { setDishIngredients(e.target.value) }}></textarea>
            <textarea type="text" placeholder='instructions' value={dishInstructions} onChange={(e) => { setDishInstructions(e.target.value) }}></textarea>
            {/* <button type="submit" className="submitChangeBtn">save change</button> */}
            <Button
              sx={{ margin: 1 }}
              type="submit"
              variant="outlined"
              endIcon={<SaveIcon />}
            ></Button>
            <Button
              sx={{ margin: 1 }}
              type="button"
              variant="outlined"
              endIcon={<CancelPresentationIcon />}
              onClick={() => setIsEditing(false)}
            ></Button>
          </form>
        </>
        : null}

    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[900] }} aria-label="recipe">
            Eric
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={dish.dish_name}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
          <Button
          sx={{ margin: 1 }}
          type="button"
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={() => editDishFunction(dish.id)}
        >edit</Button>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
 {/* <div class="flexbox-container">
        <div class="flexDish">{dish.dish_name}</div>
        <div class="flexIngredients">{dish.ingredients}</div>
        <div class="flexInstructions">{dish.instructions}</div>
        <Button
          sx={{ margin: 1 }}
          type="button"
          variant="outlined"
          endIcon={<DeleteIcon />}
          onClick={() => deleteDish(dish.id)}
        ></Button>
        {/* <button type="button" className="editBtn" onClick={() => editDishFunction(dish.id)}>edit</button> 
        <Button
          sx={{ margin: 1 }}
          type="button"
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={() => editDishFunction(dish.id)}
        ></Button>
      </div> */}
    </div>
  )
}

export default DishesListItem;





 