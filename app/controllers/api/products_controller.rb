class Api::ProductsController < ApplicationController
  before_action :set_department
  def index
    render json: @department.products
  end

  def show
    @product = @department.products.find(params[:id])
    render json: @product
  end

  def create
    @product = current_user.department.products.new(product_params)
    if @product.save
      render json: @product
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  end

  def update
    @product = current_user.department.products.find(params[:id])
    if @product.update(product_params)
      render json: @product
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @department.products.find(params[:id]).destroy
    render json: { message: 'Product deleted'}
  end

  private
    def product_params
      params.require(:product).permit(:name, :description, :price, :stock)
    end

    def set_department
      @department = Department.find(params[:department_id])
    end
end
