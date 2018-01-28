const React = require('react');
const ReactDOM = require('react-dom');

const numHor = 4;
const numVert = 4;
const numMatch = 2;

const numAll = numHor * numVert;

let checked = {
  id: false,
  family: false
};

let checking = {
  id: false,
  family: false,
  prev: false,
  bgcolor: false,
  cursor: false,
  isit: false,
  isdouble: false
};

function shuffle(arr) {
  arr.sort(function(a, b){return 0.5 - Math.random()});
  return arr;
}

function randomColor() {
  return '#' + (function lol(m,s,c){return s[m.floor(m.random() * s.length)] + 
         (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4); 
}

function genSquares() {
  let squares=[];
  for (let ellColor = randomColor(), i=1, j=1; i<=numAll; i++) {
    squares.push({
      'id': 'square-' + i,
      'family': 'family-' + j,
      'color': ellColor
    });

    if (i % numMatch == 0) {
      j++;
      ellColor = randomColor()
    }
  }
  squares = shuffle(squares);
  console.log('squares: ', squares);
  return squares;
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.flip = this.flip.bind(this);
  }
  flip() {
    this.setState({});
    console.log('checked: ', checked);
    let prev = checked.id ? checked.id : false;
    let isIt = this.props.id == prev ? true : false;
    let isDouble = this.props.family == checked.family ? true : false;
    checked = {
      id: this.props.id,
      family: this.props.family
    }
    checking = {
      id: this.props.id,
      family: this.props.family,
      prev: prev,
      bgcolor: this.props.color,
      cursor: 'default',
      isit: isIt,
      isdouble: isDouble
    }
  }
  render() {
    console.log('checking: ', checking);
    
    if (checking.isit === false) {
      if (checking.isdouble === true) {
        let family = document.querySelectorAll('*[data-family="' + checking.family + '"]');
        [].forEach.call(family, function(el) {
          el.style.visibility = 'hidden';
          console.log('hide: ', checking.family);
        });
        checked = {
          id: false,
          family: false
        }
        checking = {
          id: false,
          family: false,
          prev: false,
          bgcolor: false,
          cursor: false,
          isit: false,
          isdouble: false
        }
      } else {
        if (checking.prev != false) {
          checking.bgcolor = '';
          checking.cursor = '';
          document.getElementById(checking.prev).style.backgroundColor = '';
          document.getElementById(checking.prev).style.cursor = '';
          console.log('go back: ', checking.id, checking.prev);
          checked = {
            id: false,
            family: false
          }
          checking = {
            id: false,
            family: false,
            prev: false,
            bgcolor: false,
            isit: false,
            isdouble: false
          }
        }
      }
    }
    return (<li 
              className={this.props.class}
              style={{
                backgroundColor: checking.bgcolor,
                cursor: checking.cursor
              }}
              data-family={this.props.family}
              id={this.props.id}
              onClick={this.flip} />);
    }
}

function Board(props) {
  const data = props.data;
  const listItems = data.map(function(item, index) {
    ellClass = 'tails';
    if ((index + 1) % numHor == 0) {
      ellClass = ellClass + ' line-end';
    };
    return (
    <Square key={index}
            family={item.family}
            color={item.color}
            class={ellClass}
            id={item.id} />
    );
  });
  console.log('listItems: ', listItems);
  return (
    <ul className='board'>
      {listItems}
    </ul>
  );
}

ReactDOM.render(
  <Board data={genSquares()} />,
  document.getElementById('root')
);
//watchify -t [ babelify --presets [ react ] ] js/app.jsx -o js/app.js