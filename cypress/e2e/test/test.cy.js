describe('test calendart', () => {
    let mesec = "Август 2022";
    let dan = "12";
    let dan_u_nedelji="По";
    let ukupno;
    beforeEach(()=>{
        cy.visit("https://neradni-dani.com/kalendar-2022-srb.php")
    })
    it("Pronaci i kliknuti na zeljeni datum", ()=>{
        cy.get("div.calendar>div>div>table").each(($monthTable) =>{
            cy.wrap($monthTable).find('thead>tr:first-child>th').each((text)=>{
                if (text.text()==mesec) {
                    cy.log("Pronadjen je zeljeni mesec")
                    cy.wrap($monthTable).find('tbody>tr>td').each((dani)=>{
                        if (dani.text() == dan) {
                            cy.wrap(dani).click();
                            return false;
                        }
                    })
                }
            })
        })
    })

    it("izlistava 15. Mart i klikce na njega", ()=>{
        cy.get("div.calendar>div>div>table").each(($monthTable) =>{
            cy.wrap($monthTable).find('thead>tr:first-child>th').each((ime_meseca)=>{
                    cy.wrap($monthTable).find('tbody>tr>td').each((dani)=>{
                        if (dani.text() == 31) {
                            // cy.wrap(dani).click();
                            cy.log("Ovo su mesec sa 31 dan "+ime_meseca.text())
                            return false;
                        }
                    })              
            })
        })
    })

    it("izlistava 15. Mart i klikce na njega", ()=>{
        cy.get("//td/div[text()='31']").each((polje)=>{
            cy.wrap(polje).find('/../../../../thead/tr/th').each((imeMeseca)=>{
                cy.log(imeMeseca.text())
            })
        })
    })

    it("Nalazi sve ponedeljke u zadatom mesecu", ()=>{
        // let mesec = "Август 2022";
        let mesec = "Јун 2022";
        cy.visit("https://neradni-dani.com/kalendar-2022-srb.php")
        cy.url().should("to.contain","kalendar")

        cy.get("table>thead tr").contains(mesec).parents("table").find('tbody>tr>td:nth-child(2)>div').then(($pon)=>{
            cy.log(`Mesec: ${mesec} ima ukupno ${$pon.length} ponedeljka`)
            cy.wrap($pon).each(($e)=>cy.wrap($e).click())
        })

    })

    it("Petak 4, 15 i 25", ()=>{
        // let mesec = "Август 2022";
        let mesec = "Јун 2022";
        cy.visit("https://neradni-dani.com/kalendar-2022-srb.php")
        cy.url().should("to.contain","kalendar")

        cy.get("tbody>tr>td:nth-child(6)>div").each($mondays=>{
            if ($mondays.text() == 4 || $mondays.text() == 15 || $mondays.text() == 25) {
                cy.wrap($mondays).parents('table').find('thead>tr:first-child').then((nameOfMonth)=>{
                    cy.log(`Name of month which contains specified days is ${nameOfMonth.text()}`)
                })
            }
        })

    })


    it.only("Naci sva polja koja ne sadrze datum", ()=>{
        cy.visit("https://neradni-dani.com/kalendar-2022-srb.php")
        let dani;
        cy.get("table").each($tables=>{
            cy.wrap($tables).find("thead>tr:first-child>th").then($nameOfMonth=>{
                let ss = 0;
                let nameM = $nameOfMonth.text()
                cy.wrap($tables).find("tbody tr").then(rows=>{
                    let numOfRows = rows.length;
                    cy.wrap($tables).find("tbody td>div").then(td=>{
                    let numOfFillInDays = td.length;
                    cy.wrap($tables).find("tbody td").then(allDays =>{
                        let allD = allDays.length;
                        let emptyDays = allD-numOfFillInDays-numOfRows;
                        cy.wrap(emptyDays).as('tst')
                        cy.log(`The number of empty fields is ${emptyDays} for month ${nameM}`)
                    })
                    
                })
            })
            })
        })
        
        cy.log("sssss"+ukupno)
    })

    it.only("Count and print how many empty fields there are for entire year", ()=>{
        cy.visit("https://neradni-dani.com/kalendar-2022-srb.php")
        cy.get('td[class="day new"]').then($t=>{
            cy.get('td[class="day old"]').then($s=>{
                let a  = $t.length;
                let b  = $s.length;
                let c = a+b;
                cy.log(`The number of empty fields is ${c}`)
            })
        })
     });

});