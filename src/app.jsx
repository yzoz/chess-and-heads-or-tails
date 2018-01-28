const React = require('react');
const ReactDOM = require('react-dom');

const numHor = 4;
const numVert = 4;

const numAll = numHor * numVert;

const defCollor = '#99abc7';
const squareSize = Math.ceil(75 / numVert)

function reChecked() {
  return ({
    id: false,
    family: false
  });
}

function reChecking() {
  return ({
    id: false,
    family: false,
    prev: false,
    class: 'tails',
    color: defCollor,
    isit: false,
    isdouble: false
  });
}

let checked = reChecked();
let checking = reChecking();

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

    if (i % 2 == 0) {
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
    let cssClass = prev && !isIt ? 'tails' : 'heads';
    let color = prev && !isIt ? defCollor : this.props.color;
    checked = {
      id: this.props.id,
      family: this.props.family
    }
    checking = {
      id: this.props.id,
      family: this.props.family,
      prev: prev,
      class: cssClass,
      color: color,
      isit: isIt,
      isdouble: isDouble
    }
  }
  render() {
    if (checking.id != false) {
      console.log('checking: ', checking);
      let el = document.getElementById(checking.id)
      el.className = checking.class;
      el.style.backgroundColor = checking.color;
      if (checking.isit === false) {
        if (checking.isdouble === true) {
          let family = document.querySelectorAll('*[data-family="' + checking.family + '"]');
          [].forEach.call(family, function(el) {
            el.style.visibility = 'hidden';
          });
          console.log('hide: ', checking.family);
          checked = reChecked();
          checking = reChecking();
        } else if (checking.prev != false) {
          el = document.getElementById(checking.prev);
          el.className = checking.class;
          el.style.backgroundColor = defCollor;
          console.log('restate: ', checking.id, checking.prev);
          checked = reChecked();
          checking = reChecking();
        }
      }
    }
    console.log('+++');
    return (<li 
              className={checking.class}
              style = {{
                clear: this.props.clear,
                width: squareSize + 'vh',
                height: squareSize + 'vh',
                backgroundColor: checking.color
              }}
              data-color = {this.props.color}
              data-family = {this.props.family}
              id = {this.props.id}
              onClick = {this.flip} />);
  }
}

function Board(props) {
  const data = props.data;
  const listItems = data.map(function(item, index) {
    clear = ((index + 1) % numHor == 1) ? 'left' : 'none';
    return (
    <Square key = {index}
            family = {item.family}
            color = {item.color}
            class = 'tails'
            clear = {clear}
            id = {item.id} />
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