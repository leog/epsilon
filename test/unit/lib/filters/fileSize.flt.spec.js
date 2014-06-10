define([
    'angular-mocks',
    'filters/fileSize.flt'
], function () {
    describe('fileSize.flt', function() {
        var moFileSize;
        beforeEach(module('FileSizeFilter'));
        beforeEach(inject(function ($filter) {
            moFileSize = $filter('fileSizeFlt');
        }));
        describe('fileSizeFlt', function() {
            it('should convert bytes', function() {
                expect(moFileSize(1000)).toEqual('1000 b');
                expect(moFileSize(1020)).toEqual('1020 b');
            });
        });
    });
});