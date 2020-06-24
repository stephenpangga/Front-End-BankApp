async function Main(){
      const specURL = "https://codegeneration.c/codegeneration/api_design.yml"
      
      let swaggerClient = await new SwaggerClient(specURL)
      let result = await swaggerClient.apis.Articles.GetArticles()
      let resultsObject = JSON.parse(result.data)
      
      let results = resultsObject.Results
      console.log(results)
      // Todo: use the results here to create a table
    }
    Main()
    