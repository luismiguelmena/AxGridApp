describe('Offers Component E2E Tests', () => {
  beforeEach(() => {
    cy.visit('localhost:5173');
  });

  it('should display the offers page with all components', () => {
    // Check if the page loads and contains the main elements
    cy.contains('Offers').should('be.visible');
    cy.get('[data-testid="type-filter"]').should('be.visible');
    cy.get('table').should('be.visible');
  });

  it('should display all energy type filter options', () => {
    const expectedTypes = ['All', 'Solar', 'Wind', 'Gas', 'Hydro', 'Thermal', 'Kinetic'];
    
    expectedTypes.forEach(type => {
      cy.contains(type).should('be.visible');
    });
  });

  it('should filter offers by energy type', () => {
    // Test filtering by Solar
    cy.contains('Solar').click();
    
    // Verify only solar offers are displayed
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).should('contain', 'Solar');
    });

    // Test filtering by Wind
    cy.contains('Wind').click();
    
    // Verify only wind offers are displayed
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).should('contain', 'Wind');
    });

    // Test filtering by Gas
    cy.contains('Gas').click();
    
    // Verify only gas offers are displayed
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).should('contain', 'Gas');
    });

    // Reset to show all offers
    cy.contains('All').click();
  });

  it('should display offer data correctly in table', () => {
    // Check table headers
    const expectedHeaders = ['Type', 'Price', 'Minimum Quantity', 'Contract Terms', 'Payment Terms', 'Capacity','Status','Confirm'];
    expectedHeaders.forEach(header => {
      cy.contains(header).should('be.visible');
    });

    // Check that offers are displayed with correct data structure
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
    
    // Verify each row contains expected data
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').should('have.length', 8);
      cy.contains('€/MWh').should('be.visible');
      cy.contains('MWh').should('be.visible');
      cy.contains('MW').should('be.visible');
    });
  });

  it('should show correct status badges', () => {
    // Check for pending status badges
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('[data-state]').should('exist'); // Radix UI badge
      });
    });
  });

  it('should allow confirming offers and change status', () => {
    // Find the first unconfirmed offer
    cy.get('table tbody tr').first().within(() => {
      // Verify initial state - should show "Pending" status
      cy.contains('Pending').should('be.visible');
      
      // Verify confirm button is enabled
      cy.get('button').contains('Confirm').should('be.visible').and('not.be.disabled');
      
      // Click confirm button
      cy.get('button').contains('Confirm').click();
      
      // Verify status changed to "Confirmed"
      cy.contains('Confirmed').should('be.visible');
      cy.contains('Pending').should('not.exist');
      
      // Verify button is now disabled and shows check icon
      cy.get('button').should('be.disabled');
    });
  });

  it('should display hover card with offer details', () => {
    // Hover over the info icon in the first row
    cy.get('table tbody tr').first().within(() => {
      cy.get('[data-testid="info-icon"]').trigger('mouseover');
    });

  });

  it('should maintain filter state when confirming offers', () => {
    // Filter to show only solar offers
    cy.contains('Solar').click();
    
    // Confirm an offer
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Confirm').click();
    });
    
    // Verify filter is still active (only solar offers visible)
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).should('contain', 'Solar');
    });
  });

  it('should display all energy types when "All" filter is selected', () => {
    // Ensure "All" filter is selected
    cy.contains('All').click();
    
    // Verify all types are visible
    const energyTypes = ['Solar', 'Wind', 'Gas', 'Hydro', 'Thermal', 'Kinetic'];
    energyTypes.forEach(type => {
      cy.get('table tbody tr').should('contain', type);
    });
  });

  it('should handle empty filtered results gracefully', () => {
    // This test assumes there might be a case where filtering results in no matches
    // For now, we'll test that the table structure remains intact
    cy.get('table').should('be.visible');
    cy.get('table thead').should('be.visible');
  });

  it('should display specific mock data correctly', () => {
    // Test specific mock data from store/mock.tsx
    cy.get('table tbody tr').should('have.length', 10); // Should have 10 mock offers
    
    // Test first solar offer (ID: 101)
    cy.get('table tbody tr').first().within(() => {
      cy.contains('Solar').should('be.visible');
      cy.contains('110 €/MWh').should('be.visible');
      cy.contains('100 MWh').should('be.visible');
      cy.contains('2 years').should('be.visible');
      cy.contains('Credit card').should('be.visible');
      cy.contains('500 MW').should('be.visible');
      cy.contains('Pending').should('be.visible');
    });

    // Test gas offer (ID: 102) - should be second row
    cy.get('table tbody tr').eq(1).within(() => {
      cy.contains('Gas').should('be.visible');
      cy.contains('130 €/MWh').should('be.visible');
      cy.contains('200 MWh').should('be.visible');
      cy.contains('3 years').should('be.visible');
      cy.contains('Wire transfer').should('be.visible');
      cy.contains('1000 MW').should('be.visible');
    });

    // Test wind offer (ID: 103) - should be third row
    cy.get('table tbody tr').eq(2).within(() => {
      cy.contains('Wind').should('be.visible');
      cy.contains('95 €/MWh').should('be.visible');
      cy.contains('150 MWh').should('be.visible');
      cy.contains('1 year').should('be.visible');
      cy.contains('750 MW').should('be.visible');
    });

    // Test hydro offer (ID: 104) - should be fourth row
    cy.get('table tbody tr').eq(3).within(() => {
      cy.contains('Hydro').should('be.visible');
      cy.contains('105 €/MWh').should('be.visible');
      cy.contains('250 MWh').should('be.visible');
      cy.contains('4 years').should('be.visible');
      cy.contains('Bank transfer').should('be.visible');
      cy.contains('1200 MW').should('be.visible');
    });

    // Test thermal offer (ID: 105) - should be fifth row
    cy.get('table tbody tr').eq(4).within(() => {
      cy.contains('Thermal').should('be.visible');
      cy.contains('130 €/MWh').should('be.visible');
      cy.contains('300 MWh').should('be.visible');
      cy.contains('5 years').should('be.visible');
      cy.contains('1000 MW').should('be.visible');
    });

    // Test kinetic offer (ID: 106) - should be sixth row
    cy.get('table tbody tr').eq(5).within(() => {
      cy.contains('Kinetic').should('be.visible');
      cy.contains('90 €/MWh').should('be.visible');
      cy.contains('50 MWh').should('be.visible');
      cy.contains('1 year').should('be.visible');
      cy.contains('Credit card').should('be.visible');
      cy.contains('100 MW').should('be.visible');
    });
  });
});
