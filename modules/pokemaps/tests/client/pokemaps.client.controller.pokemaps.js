'use strict';

(function () {
  // Pokemaps Controller Spec
  describe('Pokemaps Controller Tests', function () {
    // Initialize global variables
    var PokemapsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Pokemaps,
      mockPokemap;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Pokemaps_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Pokemaps = _Pokemaps_;

      // create mock pokemap
      mockPokemap = new Pokemaps({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Pokemap about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Pokemaps controller.
      PokemapsController = $controller('PokemapsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one pokemap object fetched from XHR', inject(function (Pokemaps) {
      // Create a sample pokemaps array that includes the new pokemap
      var samplePokemaps = [mockPokemap];

      // Set GET response
      $httpBackend.expectGET('api/pokemaps').respond(samplePokemaps);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.pokemaps).toEqualData(samplePokemaps);
    }));

    it('$scope.findOne() should create an array with one pokemap object fetched from XHR using a pokemapId URL parameter', inject(function (Pokemaps) {
      // Set the URL parameter
      $stateParams.pokemapId = mockPokemap._id;

      // Set GET response
      $httpBackend.expectGET(/api\/pokemaps\/([0-9a-fA-F]{24})$/).respond(mockPokemap);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.pokemap).toEqualData(mockPokemap);
    }));

    describe('$scope.create()', function () {
      var samplePokemapPostData;

      beforeEach(function () {
        // Create a sample pokemap object
        samplePokemapPostData = new Pokemaps({
          title: 'An Pokemap about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Pokemap about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Pokemaps) {
        // Set POST response
        $httpBackend.expectPOST('api/pokemaps', samplePokemapPostData).respond(mockPokemap);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the pokemap was created
        expect($location.path.calls.mostRecent().args[0]).toBe('pokemaps/' + mockPokemap._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/pokemaps', samplePokemapPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock pokemap in scope
        scope.pokemap = mockPokemap;
      });

      it('should update a valid pokemap', inject(function (Pokemaps) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/pokemaps\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/pokemaps/' + mockPokemap._id);
      }));

      it('should set scope.error to error response message', inject(function (Pokemaps) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/pokemaps\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(pokemap)', function () {
      beforeEach(function () {
        // Create new pokemaps array and include the pokemap
        scope.pokemaps = [mockPokemap, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/pokemaps\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockPokemap);
      });

      it('should send a DELETE request with a valid pokemapId and remove the pokemap from the scope', inject(function (Pokemaps) {
        expect(scope.pokemaps.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.pokemap = mockPokemap;

        $httpBackend.expectDELETE(/api\/pokemaps\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to pokemaps', function () {
        expect($location.path).toHaveBeenCalledWith('pokemaps');
      });
    });
  });
}());
