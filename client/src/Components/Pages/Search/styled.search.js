import styled from 'styled-components';

const SearchWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .search_header {
        margin-top: 20px;
        font-size: 36px;
    }

    .wrapper__form_search {
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: auto;
        text-align:center;
        ${'' /* display: flex; */}
        ${'' /* flex-direction: column; */}
        ${'' /* align-items: flex-start; */}
        ${'' /* justify-content: center; */}

        .search-form {
            label {
                font-size: 24px;
            }
            .input_btn_wrapper {
                box-sizing: border-box;
                display: flex;

                input {
                  border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 20px;
                    height: 25px;
                    width: 300px;
                }

                button {
                    width: 50px;
                    margin-left: 5px;
                }
            }
        }
    }

    .wrapper__loading {
        margin: 20px 0 0 0;
    }

    .search__results {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;
        height: 100%;
        width: 74%;
        box-sizing: border-box;
        .search-event {
            border: 1px solid gray;
            margin: 6px;
            padding: 10px;
            height: fit-content;
            width: 250px;
            box-sizing: border-box;
            border-radius: 5px;
        }
        .search-container{
     
        }
    
        } 
      
     }
`;

export default SearchWrapper;
