import React from "react";
import Navigation from "./src/navigation/Navigation";
import ExpensesContextProvider from "./src/store/expenseContext";

const App = () => {
    return(
        <ExpensesContextProvider>
            <Navigation/>
        </ExpensesContextProvider>
    );
};

export default App;