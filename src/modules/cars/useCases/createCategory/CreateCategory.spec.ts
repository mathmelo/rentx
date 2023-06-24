import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe, it, beforeEach } from 'mocha';

import { HttpException } from '@shared/errors/HttpException';

import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryService } from './CreateCategoryService';

use(chaiAsPromised);

describe('Create category service -> ', () => {
  let categoriesRepository: CategoriesRepositoryInMemory;
  let createCategoryService: CreateCategoryService;

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category test name',
      description: 'Category test description',
    };

    await createCategoryService.execute({ ...category });

    const result = await categoriesRepository.findByName(category.name);

    expect(result).to.have.property('id');
  });

  it('should not be able to create a new category with duplicated name', async () => {
    const category = {
      name: 'Category test name',
      description: 'Category test description',
    };

    return expect(
      (async () => {
        await createCategoryService.execute({ ...category });
        await createCategoryService.execute({ ...category });
      })()
    ).to.eventually.be.rejected.and.be.an.instanceOf(HttpException);
  });
});
