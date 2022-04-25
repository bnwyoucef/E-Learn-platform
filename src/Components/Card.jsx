import * as React from 'react';
import '../Styles/cardStyle.css'

export default function CardType( {setIsTeacher} ) {
    
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-4" >
            <label>
                <input type="radio" name="product" className="card-input-element" defaultChecked onClick = {() => setIsTeacher(false)}/>
                <div className="panel panel-default card-input">
                    <img src={require('../images/ed95.png')} alt=''student icon/>
                    <div className="panel-body">
                        Student
                    </div>
                </div>
            </label>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-4" >
            <label >
                <input type="radio" name="product" className="card-input-element" onClick = {() => setIsTeacher(true)}/>
                <div className="panel panel-default card-input">
                    <img src={require('../images/teacher.png')} alt='teacher icon'/>
                    <div className="panel-body">
                        Teacher
                    </div>
                </div>
            </label>
        </div>
    </div>
</div>
  );
}
