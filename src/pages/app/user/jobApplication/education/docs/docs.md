# Added the passing date validation based on degree

 

- My refined solution discussed in call  :
    
    ### Solution can be found from line 428 to 490 in `src/pages/app/user/jobApplication/education`
    
    ```jsx
        // SSC - HSC min : 2 +
    // HSC -Grad min : 3+
    // Grad - PostGrad min: 2+
    // SSc- Grad min: HSC + Grad=> 2+3= 5+
    //
    
    const educationType = [
      {
        type: "ssc",
        name: "SSC",
        minYears: 1,
      },
      {
        type: "hsc",
        name: "HSC",
        minYears: 2,
      },
      {
        type: "graduation",
        name: "Graduation",
        minYears: 3,
      },
      {
        type: "postGraduation",
        name: "Post Graduation",
        minYears: 3,
      },
    ];
        
        
        
        //My solution as discussed in call
        if (
          educationData?.passingDate?.value !== "" &&
          educationData?.degree?.value?.trim() !== "" &&
          educationList != null &&
          educationList != undefined &&
          educationList.length > 0
        ) {
          console.log("min year validation");
    
          {
            educationList?.map((education, index) => {
              if (education?.degree == educationData?.degree?.value) {
                console.log("equal education");
              } else if (education?.degree != educationData?.degree?.value) {
                console.log("not equal education");
    
                if (education?.passingDate && educationData?.passingDate?.value) {
                  console.log(
                    "education?.passingDate : " +
                      education?.passingDate +
                      " , educationData?.passingDate?.value + " +
                      educationData?.passingDate?.value
                  );
    
                  const existingYear = new Date(
                    education.passingDate
                  ).getFullYear();
                  const currentYear = new Date(
                    educationData.passingDate.value
                  ).getFullYear();
    
                  console.log("existingPassingYear :" + existingYear);
                  console.log("currentPassingYear :" + currentYear);
                  // The refined solution after call
                  const diff = Math.abs(existingYear - currentYear);
    
                  console.log("diff : " + diff);
    
                  educationType.map((type, index) => {
                    if (educationData?.degree?.value === type?.name) {
                      console.log(" true equal ");
                      if (diff < type?.minYears) {
                        console.log(" diff is less than minYear of selected ");
    
                        data = {
                          ...data,
                          passingDate: {
                            ...data.passingDate,
                            error:
                              "Please select valid passing date for selected degree ",
                          },
                        };
                        isEmpty = false;
                        valid = false;
                      }
                    }
                  });
                }
              }
            });
          }
        }
    ```
    
- Optimized solution :
Solution can be found from line 493 to 538 in `src/pages/app/user/jobApplication/education`
    - `degreeDifference` Array :
        
        ```jsx
        // Define the minimum differences between degrees in a mapping
        const degreeDifferences = {
          SSC: {
            HSC: 2,
            Graduation: 5,
            "Post Graduation": 7,
          },
          HSC: {
            SSC: 2,
            Graduation: 3,
            "Post Graduation": 5,
          },
          Graduation: {
            SSC: 5,
            HSC: 3,
            "Post Graduation": 2,
          },
          "Post Graduation": {
            SSC: 7,
            HSC: 5,
            Graduation: 2,
          },
        };
        ```
        
    - `getMinDifference`  helper function :
        
        ```jsx
        // Function to get the minimum difference based on degrees
        const getMinDifference = (fromDegree, toDegree) => {
          return degreeDifferences[fromDegree]?.[toDegree] || 0;
        };
        ```
        
    - `calculateYearDifference`  helper function:
        
        ```jsx
        
        // Helper function to calculate the year difference between two dates
        const calculateYearDifference = (date1, date2) => {
          const year1 = new Date(date1).getFullYear();
          const year2 = new Date(date2).getFullYear();
          return Math.abs(year1 - year2);
        };
        ```
        
    - Validation block in `onHandleAdd` function :
        
        ```jsx
            // Optimized solution
            if (
              educationData?.passingDate?.value &&
              educationData?.degree?.value &&
              educationList.length > 0
            ) {
              const currentYear = new Date(
                educationData.passingDate.value
              ).getFullYear();
              const newDegree = educationData.degree.value;
              const newPassingDate = new Date(educationData.passingDate.value);
        
              // console.log("currently slected year :" + currentYear);
              // console.log("newDegree slected year :" + newDegree);
        
              // let valid = true;
        
              for (const education of educationList) {
                const existingDegree = education.degree;
                const existingYear = new Date(education.passingDate).getFullYear();
                const existingPassingDate = new Date(education.passingDate);
        
                // console.log("existingDegree  :" + existingDegree);
                // console.log("existing degree Year slected year :" + existingYear);
        
                if (existingDegree !== newDegree) {
                  const minDiff = getMinDifference(existingDegree, newDegree);
                  // const diff = Math.abs(currentYear - existingYear);
                  const diff = calculateYearDifference(newPassingDate, existingPassingDate);
        
                  console.log("existingDegree  :" + existingDegree);
        
                  if (diff < minDiff) {
                    data = {
                      ...data,
                      passingDate: {
                        ...data.passingDate,
                        error: `The difference between ${existingDegree} and ${newDegree} must be at least ${minDiff} years`,
                      },
                    };
                    valid = false;
                    break;
                  }
                }
              }
            }
        ```